/*
 * ВНЕ ЗАВИСИМОСТИ ОТ СТРАНИЦЫ — ЕДИНЫЙ ИСТОЧНИК ДАТ ГРУППОВЫХ ЗАНЯТИЙ.
 *
 * Чтобы изменить даты — редактируй ТОЛЬКО массив `dates` ниже.
 * Эти данные автоматически подставляются:
 *   - в карточки на главной (index.html)
 *   - в выпадающие списки дат в формах (kontaktai.html, paslaugos.html)
 *
 * Формат одной даты: { day: 'Birželio 21 d.', time: '14:00' }
 *   - time можно оставить пустым ('') — например для "Rugsėjo mėnesį".
 *   - если массив dates пуст ([]) — везде покажется "Artimiausias galimas laikas".
 */
(function () {
    'use strict';

    var SESSIONS = {
        judesio: {
            name: 'Judesio terapija',
            city: 'Vilnius',
            dates: [
                { day: 'Birželio 21 d.', time: '14:00' }
            ]
        },
        meno: {
            name: 'Meno terapija',
            city: 'Vilnius',
            dates: [
                { day: 'Rugsėjo mėnesį', time: '' }
            ]
        }
    };

    var FALLBACK = 'Artimiausias galimas laikas';

    // Текст слота для <option> и письма: "Birželio 21 d. 14:00" или "Rugsėjo mėnesį"
    function slotLabel(slot) {
        return slot.time ? (slot.day + ' ' + slot.time) : slot.day;
    }

    // Текст слота для карточки: "Birželio 21 d. · 14:00 · Vilnius"
    function cardLabel(data) {
        if (!data.dates.length) {
            return data.city ? (FALLBACK + ' · ' + data.city) : FALLBACK;
        }
        var s = data.dates[0];
        var parts = [s.day];
        if (s.time) parts.push(s.time);
        if (data.city) parts.push(data.city);
        return parts.join(' · ');
    }

    // Заполнить <select data-session="judesio|meno"> опциями дат
    function fillSelect(select) {
        var key = select.getAttribute('data-session');
        var data = SESSIONS[key];
        if (!data) return;

        select.innerHTML = '';
        var ph = document.createElement('option');
        ph.value = '';
        ph.textContent = 'Pasirinkite datą';
        select.appendChild(ph);

        if (!data.dates.length) {
            var fb = document.createElement('option');
            fb.value = FALLBACK;
            fb.textContent = FALLBACK;
            select.appendChild(fb);
            return;
        }

        data.dates.forEach(function (slot) {
            var opt = document.createElement('option');
            opt.value = slotLabel(slot);
            opt.textContent = slotLabel(slot);
            select.appendChild(opt);
        });
    }

    // Заполнить карточку <... data-session-card="judesio"> (текст в [data-session-date])
    function fillCard(el) {
        var key = el.getAttribute('data-session-card');
        var data = SESSIONS[key];
        if (!data) return;
        var dateEl = el.querySelector('[data-session-date]');
        if (dateEl) dateEl.textContent = cardLabel(data);
    }

    function init() {
        document.querySelectorAll('select[data-session]').forEach(fillSelect);
        document.querySelectorAll('[data-session-card]').forEach(fillCard);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // На случай, если понадобится из других скриптов
    window.GroupSessions = { data: SESSIONS, slotLabel: slotLabel, cardLabel: cardLabel };
})();

class CountdownTimer {
    constructor(selector, targetDate) {
        this.selector = document.querySelector(selector);
        this.targetDate = new Date(targetDate);
    }
    startCountdown() {
        this.timerId = setInterval(() => {
            this.currentTime = new Date();
            this.remainingTime = this.targetDate - this.currentTime;
            this.timeCounter();
            this.insertToHTML();
            if (this.remainingTime < 0) {
                this.stopCountdown();
            }
        }, 1000);
    }
    timeCounter() {
        /*
         * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
         * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
         */
        this.days = Math.floor(this.remainingTime / (1000 * 60 * 60 * 24));

        /*
         * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
         * остатка % и делим его на количество миллисекунд в одном часе
         * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
         */
        this.hours = Math.floor(
            (this.remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );

        /*
         * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
         * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
         */
        this.mins = Math.floor(
            (this.remainingTime % (1000 * 60 * 60)) / (1000 * 60)
        );

        /*
         * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
         * миллисекунд в одной секунде (1000)
         */
        this.secs = Math.floor((this.remainingTime % (1000 * 60)) / 1000);
    }
    insertToHTML() {
        this.refs = {
            days: document.querySelector('[data-value="days"]'),
            hours: document.querySelector('[data-value="hours"]'),
            minutes: document.querySelector('[data-value="mins"]'),
            seconds: document.querySelector('[data-value="secs"]'),
        };

        this.refs.days.textContent = this.days;
        this.refs.hours.textContent = this.hours;
        this.refs.minutes.textContent = this.mins;
        this.refs.seconds.textContent = this.secs;
    }
    stopCountdown() {
        clearInterval(this.timerId);
        this.remainingTime = 0;
        this.timeCounter(this.remainingTime);
        this.insertToHTML(this.remainingTime);
    }
}

const countdownTimer = new CountdownTimer("#timer-1", "Jan 1, 2021, 00:00");
countdownTimer.startCountdown();
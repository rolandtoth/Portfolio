var randomQuote = {
    $wrap: document.querySelector(".quotes"),
    current: window.pageNumber || 1,
    randomize: function () {
        // randomize array items and move currenty displayed to the end
        var index = this.current - 1,
            currentQuote = quotes[index];

        // remove
        quotes.splice(index, 1);

        quotes = quotes.sort(function () {
            return 0.5 - Math.random();
        });

        // append as last
        quotes.push(currentQuote);

        return quotes;
    },
    addButton: function () {

        if (!this.$wrap) {
            return false;
        }

        this.$btn = document.createElement("button");

        this.$btn.addEventListener("click", function () {
            randomQuote.updateQuote();
        });

        this.$wrap.appendChild(this.$btn);
    },
    getNext: function () {
        var index = this.current++ % quotes.length; // if we've gone too high, start from 0 again
        return quotes[index];
    },
    updateQuote: function () {
        var next = this.getNext();

        this.$wrap.querySelector('.text').innerHTML = next[1];
        this.$wrap.querySelector('.author').innerHTML = next[0];
    }
};

randomQuote.randomize();
randomQuote.addButton();
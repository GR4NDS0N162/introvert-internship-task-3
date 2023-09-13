widgetKvnukovIntr = function () {
    const widget = this;
    this.code = null;

    this.bind_actions = function () {
    };

    this.render = function () {
        const $pipelineCells = $(`.pipeline_status.pipeline_cell`);

        for (let i = 0, visibleIndex = 0; i < $pipelineCells.length; i++) {
            const pipelineCell = $pipelineCells[i];
            const isVisible = this.isVisible(pipelineCell);
            if (isVisible) visibleIndex++;

            if (visibleIndex === 3) {
                const className = this.getPipelineClassName(pipelineCell.classList);
                if (!className) return;

                const $title = $(`.${className} .pipeline_status__head_title`);
                const $line = $(`.${className} .pipeline_status__head_line`);
                if ($title.length && $line.length) {
                    $title[0].style.color = $line[0].style.color;
                    return;
                }
            }
        }
    };

    this.isVisible = function (pipelineCell) {
        for (let j = 0; j < pipelineCell.classList.length; j++) {
            if (pipelineCell.classList[j] === 'h-hidden') {
                return false;
            }
        }
        return true;
    };

    this.getPipelineClassName = function (classList) {
        const rx = /^pipeline_cell-\d+$/;
        for (let j = 0; j < classList.length; j++) {
            if (rx.test(classList[j])) {
                return classList[j];
            }
        }
    };

    this.init = function () {
    };

    this.bootstrap = function (code) {
        widget.code = code;
        const status = 1; // yadroFunctions.getSettings(code).frontend_status;

        if (status) {
            widget.init();
            widget.render();
            widget.bind_actions();
            $(document).on('widgets:load', function () {
                widget.render();
            });
        }
    }
}

yadroWidget.widgets['kvnukov123-widget'] = new widgetKvnukovIntr();
yadroWidget.widgets['kvnukov123-widget'].bootstrap('kvnukov123-widget');

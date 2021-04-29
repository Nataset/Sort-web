document.addEventListener("DOMContentLoaded", function () {
    var unsort_arr = [
        52,
        34,
        71,
        43,
        64,
        56,
        32,
        20,
        67,
        38,
        28,
        54,
        75,
        20,
        61,
        25,
        47,
        22,
        15,
    ];
    var startSort;
    var startState = 0;

    var setGraphValue = function (i, input_arr) {
        var graphName = ".graph" + (parseInt(i) + 1);
        var graphHeight = input_arr[i] * 10 + "px";
        document.querySelector(graphName).style.height = graphHeight;
    };

    var setGraphColor = function (i, color) {
        var graphName = ".graph" + (parseInt(i) + 1);
        document.querySelector(graphName).style.backgroundColor = color;
    };

    var resetGraph = function (input_arr) {
        for (var i in input_arr) {
            setGraphValue(i, input_arr);
        }
    };

    var delay = function () {
        return new Promise(function (resolve) {
            setTimeout(resolve, 500);
        });
    };

    var selectionSort = async function (input_arr) {
        startState = 1;
        for (var i = 0; i < input_arr.length; i++) {
            var min = i;
            for (var j = i + 1; j < input_arr.length; j++) {
                if (input_arr[j] < input_arr[min]) {
                    min = j;
                }
            }

            if (min != i) {
                var tmp = input_arr[i];
                setGraphColor(min, "red");
                await delay();
                input_arr[i] = input_arr[min];
                setGraphValue(i, input_arr);
                setGraphColor(min, "blue");
                setGraphColor(i, "red");
                input_arr[min] = tmp;
                setGraphValue(min, input_arr);
                await delay();
                setGraphColor(i, "blue");
            }
        }
        startState = 0;
        return input_arr;
    };

    document.querySelector("#start").onclick = function (event) {
        startSort(unsort_arr.slice(0));
        console.log("TEST");
    };

    document.querySelector("#reset").onclick = function (event) {
        if (!startState) resetGraph(unsort_arr);
    };

    document.querySelector("#selectionSort").onclick = function (event) {
        startSort = selectionSort;
    };

    resetGraph(unsort_arr);
});
// parseInt

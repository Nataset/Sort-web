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
    var readyState = 1;

    var setGraphValue = function (i, input_arr) {
        var graphName = ".graph" + (parseInt(i) + 1);
        var graphHeight = input_arr[i] * 10 + "px";
        document.querySelector(graphName).style.height = graphHeight;
    };

    var setGraphColor = function (i, color) {
        var graphName = ".graph" + (parseInt(i) + 1);
        document.querySelector(graphName).style.background = color;
    };

    var resetGraph = function (input_arr) {
        for (var i in input_arr) {
            setGraphValue(i, input_arr);
        }
    };

    var delay = function () {
        return new Promise(function (resolve) {
            setTimeout(resolve, 100);
        });
    };

    var swap = async function (i, j, input_arr) {
        var tmp = input_arr[i];
        setGraphColor(j, "red");
        await delay();
        input_arr[i] = input_arr[j];
        setGraphValue(i, input_arr);
        setGraphColor(j, "blue");
        setGraphColor(i, "red");
        input_arr[j] = tmp;
        setGraphValue(j, input_arr);
        await delay();
        setGraphColor(i, "blue");
    };

    var selectionSort = async function (input_arr) {
        readyState = 0;
        for (var i = 0; i < input_arr.length; i++) {
            var min = i;
            for (var j = i + 1; j < input_arr.length; j++) {
                if (input_arr[j] < input_arr[min]) {
                    min = j;
                }
            }

            if (min != i) {
                await swap(i, min, input_arr);
            }
        }
        readyState = 1;
        return input_arr;
    };

    var bubbleSort = async function (input_arr) {
        readyState = 0;
        var check;
        do {
            check = 0;
            for (var i = 0; i < input_arr.length - 1; i++) {
                if (input_arr[i] > input_arr[i + 1]) {
                    await swap(i, i + 1, input_arr);
                    check = 1;
                }
            }
        } while (check);
        readyState = 1;
        return input_arr;
    };

    document.querySelector("#start").onclick = function (event) {
        if (readyState) startSort(unsort_arr.slice(0));
    };

    document.querySelector("#reset").onclick = function (event) {
        if (readyState) resetGraph(unsort_arr.slice(0));
    };

    document.querySelector("#selectionSort").onclick = function (event) {
        startSort = selectionSort;
    };

    document.querySelector("#bubbleSort").onclick = function (event) {
        startSort = bubbleSort;
    };

    resetGraph(unsort_arr);

    // console.log(bubbleSort(unsort_arr.slice(0)));
});
// parseInt

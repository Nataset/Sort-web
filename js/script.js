document.addEventListener("DOMContentLoaded", function () {
    var unsort_arr = [52, 34, 71, 43, 64, 56, 32, 20, 49, 38];

    var setGraph = function (input_arr) {
        for (var i in input_arr) {
            var graphName = ".graph" + (parseInt(i) + 1);
            var graphHeight = input_arr[i] * 10 + "px";
            document.querySelector(graphName).style.height = graphHeight;
            console.log(graphName);
        }
    };

    var selectionSort = function (input_arr) {
        for (var i = 0; i < input_arr.length; i++) {
            var min = i;
            for (var j = i + 1; j < input_arr.length; j++) {
                if (input_arr[j] < input_arr[min]) {
                    min = j;
                }
            }

            if (min != i) {
                var tmp = input_arr[i];
                input_arr[i] = input_arr[min];
                input_arr[min] = tmp;
            }
        }

        return input_arr;
    };

    setGraph(unsort_arr);
    var sort_arr = selectionSort(unsort_arr);

    document.querySelector("#demo").onclick = function (event) {
        setGraph(sort_arr);
    };
});
// parseInt

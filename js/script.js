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
    var selectSort;
    var readyState = 1;
    var finishState = 0;

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

    var swp = function (i, j, input_arr) {
        var tmp = input_arr[0];
        input_arr[0] = input_arr[1];
        input_arr[1] = tmp;
        return;
    };

    var delay = function () {
        return new Promise(function (resolve) {
            setTimeout(resolve, 50);
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
            setGraphColor(i, "red");
            await delay();
            setGraphColor(i, "blue");
            var min = i;
            for (var j = i + 1; j < input_arr.length; j++) {
                setGraphColor(j, "red");
                await delay();
                setGraphColor(j, "blue");
                if (input_arr[j] < input_arr[min]) {
                    min = j;
                }
            }

            if (min != i) {
                console.log("TEST");
                await swap(i, min, input_arr);
            }
        }
        readyState = 1;
        finishState = 1;
        return input_arr;
    };

    // var quickSort = function (input_arr) {
    //     function partition(input_arr, left, right) {
    //         var pivot = right;
    //         var i = left;

    //         for (var j = left; j < right; j++) {
    //             if (input_arr[j] <= input_arr[pivot]) {
    //                 swp(i, j, input_arr);
    //                 i++;
    //             }
    //         }
    //         swp(i, j, input_arr);
    //         return i;
    //     }

    //     function quickRecur(input_arr, left, right) {
    //         left = left || 0;
    //         right = right || input_arr.length - 1;

    //         var pivot = partition(input_arr, left, right);

    //         if (left < pivot - 1) {
    //             quickRecur(input_arr, left, pivot - 1);
    //         }

    //         if (right > pivot) {
    //             quickRecur(input_arr, pivot - 1, right);
    //         }

    //         return array;
    //     }

    //     return quickRecur(input_arr, 0, input_arr.length - 1);
    // };

    var mergeSort = function (input_arr) {
        readyState = 0;
        var l = 0;
        var r = input_arr.length;
        var merge = async function (input_arr, l, m, r) {
            var left = input_arr.slice(l, m + 1);
            var right = input_arr.slice(m + 1, r + 1);

            var i = 0;
            var j = 0;
            var k = l;
            while (i < left.length && j < right.length) {
                if (left[i] <= right[j]) {
                    setGraphColor(k, "red");
                    input_arr[k] = left[i];
                    setGraphValue(k, input_arr);
                    await delay();
                    setGraphColor(k, "blue");

                    i++;
                } else {
                    setGraphColor(k, "red");
                    input_arr[k] = right[j];
                    setGraphValue(k, input_arr);
                    await delay();
                    setGraphColor(k, "blue");

                    j++;
                }
                k++;
            }
            while (i < left.length) {
                setGraphColor(k, "red");
                input_arr[k] = left[i];
                setGraphValue(k, input_arr);
                await delay();
                setGraphColor(k, "blue");
                i++;
                k++;
            }
            while (j < right.length) {
                setGraphColor(k, "red");
                input_arr[k] = right[j];
                setGraphValue(k, input_arr);
                await delay();
                setGraphColor(k, "blue");
                j++;
                k++;
            }
        };

        var mergeRecur = async function (input_arr, l, r) {
            console.log(l, r);
            var m = parseInt(l + (r - l) / 2);
            if (l >= r) return;

            await mergeRecur(input_arr, l, m);
            await mergeRecur(input_arr, m + 1, r);
            await merge(input_arr, l, m, r);
        };

        mergeRecur(input_arr, l, r);
        readyState = 1;
        finishState = 1;
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
        finishState = 1;
        return input_arr;
    };

    var reBubbleSort = function (input_arr, n) {
        if (n === 1) return;

        for (var i = 0; i < input_arr.length - 1; i++) {
            if (input_arr[i] > input_arr[i + 1]) {
                var tmp = input_arr[i];
                input_arr[i] = input_arr[i + 1];
                input_arr[i + 1] = tmp;
            }
        }
        reBubbleSort(input_arr, n - 1);
    };

    var insertionSort = async function (input_arr) {
        readyState = 0;
        var size = input_arr.length;
        for (var i = 1; i < size; i++) {
            var key = input_arr[i];
            var j = i - 1;
            while (j >= 0 && key < input_arr[j]) {
                setGraphColor(j, " red");
                await delay();
                input_arr[j + 1] = input_arr[j];
                setGraphValue(j + 1, input_arr);
                setGraphColor(j, "blue");
                setGraphColor(j + 1, "red");
                await delay();
                setGraphColor(j + 1, "blue");

                j--;
            }
            setGraphColor(j + 1, "red");
            input_arr[j + 1] = key;
            setGraphValue(j + 1, input_arr);
            await delay();
            setGraphColor(j + 1, "blue");
        }
        readyState = 1;
        finishState = 1;
        return input_arr;
    };

    document.querySelector("#start").onclick = function (event) {
        if (readyState && !finishState) selectSort(unsort_arr.slice(0));
    };

    document.querySelector("#reset").onclick = function (event) {
        if (readyState) resetGraph(unsort_arr.slice(0));
        finishState = 0;
    };

    document.querySelector("#selectionSort").onclick = function (event) {
        selectSort = selectionSort;
    };

    document.querySelector("#bubbleSort").onclick = function (event) {
        selectSort = bubbleSort;
    };

    document.querySelector("#insertSort").onclick = function (event) {
        selectSort = insertionSort;
    };

    document.querySelector("#mergeSort").onclick = function (event) {
        selectSort = mergeSort;
    };

    document.querySelector("#quickSort").onclick = function (event) {
        selectSort = mergeSort;
    };

    resetGraph(unsort_arr);

    // console.log(quickSort(unsort_arr));
});
// parseInt

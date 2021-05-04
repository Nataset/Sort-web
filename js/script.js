document.addEventListener("DOMContentLoaded", function () {
    var graphSize = 25; //size of array
    var graphHeight = 1.1; //percent
    var graphWidth = 2.4; //percent
    var spaceWidth = 0.8; //percent
    var sortingSpeed = 25; //millisec

    var unsort_arr = [
        50,
        46,
        35,
        57,
        35,
        80,
        44,
        19,
        59,
        65,
        58,
        77,
        73,
        14,
        30,
        25,
        67,
        62,
        43,
        12,
        45,
        50,
        13,
        11,
        52,
    ];
    var selectSort;
    var readyState = 1;
    var finishState = 0;
    var sumWidth = graphWidth + 2 * spaceWidth;

    var createGraph = function (n) {
        for (var i = 1; i <= n; i++) {
            var left = sumWidth * (i - 1) + "%";
            var graph = document.createElement("div");
            graph.style.width = graphWidth + "%";
            graph.style.margin = "0px" + spaceWidth + "%";
            graph.className = "graph" + i;
            graph.style.left = left;
            document.querySelector(".content").appendChild(graph);
        }
    };

    var setGraphValue = function (i, input_arr) {
        var name = ".graph" + (parseInt(i) + 1);
        var height = input_arr[i] * graphHeight + "%";
        document.querySelector(name).style.height = height;
    };

    var setGraphColor = function (i, color) {
        var name = ".graph" + (parseInt(i) + 1);
        document.querySelector(name).style.background = color;
    };

    var resetGraph = function (input_arr) {
        for (var i in input_arr) {
            setGraphValue(i, input_arr);
        }
    };

    var resizeWindow = function () {
        document.querySelector(".content").style.height =
            window.innerHeight - 53 + "px";
    };

    var delay = function () {
        return new Promise(function (resolve) {
            setTimeout(resolve, sortingSpeed);
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
                await swap(i, min, input_arr);
            }
        }
        readyState = 1;
        finishState = 1;
        return input_arr;
    };

    var quickSort = async function (input_arr) {
        readyState = 0;
        var partition = async function (input_arr, left, right) {
            var pivot = input_arr[right];

            var i = left;
            var j = right - 1;

            while (i < j) {
                while (input_arr[i] < pivot) {
                    setGraphColor(i, "red");
                    await delay();
                    setGraphColor(i, "blue");
                    i++;
                }
                while (j > left && input_arr[j] >= pivot) {
                    setGraphColor(j, "red");
                    await delay();
                    setGraphColor(j, "blue");
                    j--;
                }

                if (i < j) {
                    await swap(i, j, input_arr);
                    i++;
                    j--;
                }
            }

            if (i === j && input_arr[i] < pivot) {
                i++;
            }

            if (input_arr[i] != pivot) {
                await swap(i, right, input_arr);
            }
            return i;
        };

        var quickRecur = async function (input_arr, left, right) {
            if (left >= right) return;

            var pivotPos = await partition(input_arr, left, right);
            await quickRecur(input_arr, left, pivotPos - 1);
            await quickRecur(input_arr, pivotPos + 1, right);
        };

        await quickRecur(input_arr, 0, input_arr.length - 1);
        readyState = 1;
        finishState = 1;
        return input_arr;
    };

    var mergeSort = async function (input_arr) {
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
            var m = parseInt(l + (r - l) / 2);
            if (l >= r) return;

            await mergeRecur(input_arr, l, m);
            await mergeRecur(input_arr, m + 1, r);
            await merge(input_arr, l, m, r);
        };

        await mergeRecur(input_arr, l, r);
        readyState = 1;
        finishState = 1;
        return input_arr;
    };

    var bubbleSort = async function (input_arr) {
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
        try {
            if (readyState && !finishState) selectSort(unsort_arr.slice(0));
        } catch (err) {
            if (err instanceof TypeError)
                alert("Please select a sorting algorithm first.");
            else console.error(err.message);
        }
    };

    document.querySelector("#reset").onclick = function (event) {
        if (readyState) {
            resetGraph(unsort_arr.slice(0));
            finishState = 0;
        }
    };

    document.querySelectorAll("#selectSort").forEach(function (el) {
        el.onclick = function (event) {
            selectSort = selectionSort;
        };
    });

    document.querySelectorAll("#bubbleSort").forEach(function (el) {
        el.onclick = function (event) {
            selectSort = bubbleSort;
        };
    });

    document.querySelectorAll("#insertSort").forEach(function (el) {
        el.onclick = function (event) {
            selectSort = insertionSort;
        };
    });

    document.querySelectorAll("#mergeSort").forEach(function (el) {
        el.onclick = function (event) {
            selectSort = mergeSort;
        };
    });

    document.querySelectorAll("#quickSort").forEach(function (el) {
        el.onclick = function (event) {
            selectSort = quickSort;
        };
    });
    resizeWindow();

    window.onresize = resizeWindow;

    createGraph(graphSize);

    resetGraph(unsort_arr);
});

/*冒泡排序*/
function bubbleSort(arr, desc) {
    var i, len, j, temp;
    if (!arr || !arr.hasOwnProperty("length"))
        return;
    for (i = 0, len = arr.length; i < len; i++) {
        for (j = i + 1; j < len; j++) {
            if (desc ? arr[i] < arr[j] : arr[i] > arr[j]) {
                swap(arr, i, j);
            }
        }
    }
}

/*快速排序*/
function quickSort(arr, low, high, desc) {
    var index;
    if (!arr || !arr.hasOwnProperty("length") || low >= high)
        return;
    index = onceSort(arr, low, high, desc);
    quickSort(arr, low, index - 1, desc);
    quickSort(arr, index + 1, high, desc);
}

/*一次快排*/
function onceSort(arr, low, high, desc) {
    var key = arr[low];
    while (low < high) {
        while ((desc ? arr[high] <= key : arr[high] >= key) && high > low) {
            high--;
        }
        arr[low] = arr[high];
        while ((desc ? arr[low] >= key : arr[low] <= key) && high > low) {
            low++;
        }
        arr[high] = arr[low];
    }
    arr[low] = key;
    return low;
}

function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

/*构造一个堆 */
function makeHeap(arr, desc) {
    var i,
        len = arr.length;
    for (i = (len / 2 | 0) - 1; i >= 0; i--) {
        heapAdjust(arr, i, len, desc);
    }
}

/*调整堆*/
function heapAdjust(arr, i, n, desc) {
    var j = 2 * i + 1,
        temp = arr[i];
    while (j < n) {
        if (j + 1 < n && (desc ? arr[j + 1] < arr[j] : arr[j + 1] > arr[j])) {
            j++;
        }
        if (desc ? arr[j] >= temp : arr[j] <= temp) {
            break;
        }
        arr[i] = arr[j];
        i = j;
        j = 2 * i + 1;
    }
    arr[i] = temp;
}

/*堆排序*/
function heapSort(arr, desc) {
    var i, len;
    if (!arr || !arr.hasOwnProperty("length"))
        return;
    len = arr.length;
    makeHeap(arr, desc);
    for (i = len - 1; i > 0; i--) {
        swap(arr, i, 0);
        heapAdjust(arr, 0, i, desc);
    }
}

function unitTest(len, sortFun) {
    var arr = [],
        i,
        startTime,
        endTime,
        args = [].splice.call(arguments, 2);
    len = len || 1000;
    for (i = 0; i < len; i++) {
        arr.push(Math.random() * len | 0);
    }
    startTime = +new Date;
    console.log("before sort,the array is: ", arr);
    console.log("before sort,the time is: ", startTime);
    args = [arr].concat(args);
    sortFun.apply(null, args);
    endTime = +new Date;
    console.log("after sort,the array is: ", arr);
    console.log("after sort,the time is: ", endTime);
    console.log("the sort function spend time: ", endTime - startTime);
}
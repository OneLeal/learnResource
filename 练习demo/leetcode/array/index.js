/**
 * 53. 最大子序和
 * 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 示例 1：
 * 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
 * 输出：6
 * 解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
 */
var nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
var maxSubArray = function(nums) {
    var sum = 0, result = nums[0];
    for (var num of nums) {
        sum > 0 ? sum += num : sum = num;
        result = Math.max(sum, result);
    }
    return result;
};
console.log('maxSubArray: ', maxSubArray(nums));

/**
 * 66. 加一
 * 给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。
 * 最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。
 * 你可以假设除了整数 0 之外，这个整数不会以零开头。
 * 
 * 示例 1：
 * 输入：digits = [1,2,3]
 * 输出：[1,2,4]
 * 解释：输入数组表示数字 123。
 */
 var plusOne = function(digits) {
    var add = false;
    for (var i = digits.length - 1; i > -1; i--) {
        if (i === digits.length - 1 && ++digits[i] === 10) {
            digits[i] = 0;
            add = true;
        } else {
            add && ++digits[i];
            digits[i] === 10 ? digits[i] = 0 : add = false;
        }
    }
    digits.every(num => num === 0) && digits.unshift(1);
    return digits;
};
console.log('plusOne: ', plusOne([9, 9, 9]));

/**
 * 88. 合并两个有序数组
 * 给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。
 * 请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。
 * 注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。
 * 为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。
 * 示例 1：
 * 输入：nums1 = [ ,0,0,0], m = 3, nums2 = [2,5,6], n = 3
 * 输出：[1,2,2,3,5,6]
 * 解释：需要合并 [1,2,3] 和 [2,5,6] 。
 * 合并结果是 [1,2,2,3,5,6] ，其中斜体加粗标注的为 nums1 中的元素。
 */
 var merge = function(nums1, m, nums2, n) {
    for (var i = 0; i < nums2.length; i++) {
        for (var j = 0; j < nums1.length; j++) {
            if (nums1[j] >= nums2[i]) {
                nums1.splice(j, 0, nums2[i]);
                nums1.pop();
                m++;
                break;
            } else {
                if (j + 1 > m && nums1[j] === 0) {
                    nums1[j] = nums2[i];
                    m++;
                    break;
                }
            }
        }
    }
};
var nums1 = [-1,0,0,3,3,3,0,0,0], m = 6, nums2 = [1,2,2], n = 3;
merge(nums1, m, nums2, n);
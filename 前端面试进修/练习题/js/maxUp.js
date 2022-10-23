// 最长上升子序列
function maxUp(arr) {
  if (arr.length === 0) return 0;
  let dp = [];
  let max = 0;
  dp[0] = 1;
  for (let i = 1; i < arr.length; i++) {
    dp[i] = 1;
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j]) {
        dp[i] = Math.max(dp[j] + 1, dp[i]);
      }
    }
    max = Math.max(dp[i], max);
  }
  return dp;
}

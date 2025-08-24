interface Sheet {
  topic: string;
  level: {
    Easy: questions[];
    Medium: questions[];
    Hard: questions[];
  };
}

interface questions {
  quesNo: number;
  title: string;
  description: string;
  constraint: string;
  tag: string[];
  leetcode: string;
  points: number;
  difficulty: string;
  cases: {
    caseNumber: number;
    input: string[];
    output: string;
    explanation?: string;
  }[];
  templateCode: {
    Python: string;
    Java: string;
    Cpp: string;
  };
  wrapperCode: {
    Python: string;
    Java: string;
    Cpp: string;
  };
}

export const sheet: Sheet[] = [
  {
    topic: "Arrays",
    level: {
      Easy: [
        {
          quesNo: 1,
          title: "Two Sum",
          description:
            "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
          constraint:
            "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9\nOnly one valid answer exists.",
          difficulty: "Easy",
          tag: ["Array", "HashTable"],
          leetcode: "https://leetcode.com/problems/two-sum/description/",
          points: 10,
          cases: [
            {
              caseNumber: 1,
              input: ["nums", "[2,7,11,15]", "target", "9"],
              output: "[0,1]",
              explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
            },
            {
              caseNumber: 2,
              input: ["nums", "[3,2,4]", "target", "6"],
              output: "[1,2]",
            },
            {
              caseNumber: 3,
              input: ["nums", "[3,3]", "target", "6"],
              output: "[0,1]",
            },
          ],
          templateCode: {
            Python: "def twoSum(nums, target):\n    pass",
            Java: "class Solution {\n    int[] twoSum(int[] nums, int target) {\n        return new int[]{};\n    }\n}",
            Cpp: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        return {};\n    }\n};",
          },
          wrapperCode: {
            Java: 'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] nums = {nums};\n        int target = {target};\n        int[] result = sol.twoSum(nums, target);\n        System.out.print("[");\n        for (int i = 0; i < result.length; i++) {\n            System.out.print(result[i]);\n            if (i < result.length - 1) {\n                System.out.print(",");\n            }\n        }\n        System.out.println("]");\n    }\n}',
            Python:
              'if __name__ == "__main__":\n    nums = {nums}\n    target = {target}\n    print(twoSum(nums, target))',
            Cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> nums = {nums};\n    int target = {target};\n    vector<int> result = sol.twoSum(nums, target);\n    cout << "[";\n    for (size_t i = 0; i < result.size(); i++) {\n        cout << result[i];\n        if (i != result.size() - 1) cout << ",";\n    }\n    cout << "]" << endl;\n    return 0;\n}',
          },
        },
        {
          quesNo: 2,
          title: "Merge Sorted Array",
          description:
            "You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.\n\nMerge nums1 and nums2 into a single array sorted in non-decreasing order.\n\nThe final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.",
          constraint:
            "nums1.length == m + n\nnums2.length == n\n0 <= m, n <= 200\n1 <= m + n <= 200\n-10^9 <= nums1[i], nums2[j] <= 10^9",
          difficulty: "Easy",
          tag: ["Array", "Two Pointers"],
          leetcode: "https://leetcode.com/problems/merge-sorted-array/",
          points: 10,
          cases: [
            {
              caseNumber: 1,
              input: [
                "nums1",
                "[1,2,3,0,0,0]",
                "m",
                "3",
                "nums2",
                "[2,5,6]",
                "n",
                "3",
              ],
              output: "[1,2,2,3,5,6]",
              explanation:
                "Merge nums2 into nums1 such that the resulting array is sorted.",
            },
            {
              caseNumber: 2,
              input: ["nums1", "[1]", "m", "1", "nums2", "[]", "n", "0"],
              output: "[1]",
              explanation: "Since nums2 is empty, the result is just nums1.",
            },
            {
              caseNumber: 3,
              input: ["nums1", "", "m", "0", "nums2", "[1]", "n", "1"],
              output: "[1]",
              explanation: "Merge nums2 into nums1 resulting in [1].",
            },
          ],
          templateCode: {
            Python: "def merge(nums1, m, nums2, n):\n    pass",
            Java: "class Solution {\n    void merge(int[] nums1, int m, int[] nums2, int n) {\n        // Code goes here\n    }\n}",
            Cpp: "class Solution {\npublic:\n    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {\n        // Code goes here\n    }\n};",
          },
          wrapperCode: {
            Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] nums1 = {nums1};\n        int m = {m};\n        int[] nums2 = {nums2};\n        int n = {n};\n        sol.merge(nums1, m, nums2, n);\n        System.out.println(Arrays.toString(nums1));\n    }\n}",
            Python:
              "if __name__ == '__main__':\n    nums1 = {nums1}\n    m = {m}\n    nums2 = {nums2}\n    n = {n}\n    merge(nums1, m, nums2, n)\n    print(nums1)",
            Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> nums1 = {nums1};\n    int m = {m};\n    vector<int> nums2 = {nums2};\n    int n = {n};\n    sol.merge(nums1, m, nums2, n);\n    for (int i : nums1) cout << i << ' ';\n    return 0;\n}",
          },
        },
        {
          quesNo: 3,
          title: "Remove Element",
          description:
            "Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The order of the elements may be changed. Then return the number of elements in nums which are not equal to val.\n\nConsider the number of elements in nums which are not equal to val be k, to get accepted, you need to do the following things:\n\nChange the array nums such that the first k elements of nums contain the elements which are not equal to val. The remaining elements of nums are not important as well as the size of nums.\nReturn k.",
          constraint:
            "0 <= nums.length <= 100\n0 <= nums[i] <= 50\n0 <= val <= 100",
          difficulty: "Easy",
          tag: ["Array", "Two Pointers"],
          leetcode: "https://leetcode.com/problems/remove-element/",
          points: 10,
          cases: [
            {
              caseNumber: 1,
              input: ["nums", "[3,2,2,3]", "val", "3"],
              output: "2",
              explanation:
                "After removing all occurrences of 3, nums becomes [2,2] and the length of the resulting array is 2.",
            },
            {
              caseNumber: 2,
              input: ["nums", "[0,1,2,2,3,0,4,2]", "val", "2"],
              output: "5",
              explanation:
                "After removing all occurrences of 2, nums becomes [0,1,3,0,4] and the length of the resulting array is 5.",
            },
            {
              caseNumber: 3,
              input: ["nums", "[2,2,2,2]", "val", "2"],
              output: "0",
              explanation:
                "After removing all occurrences of 2, nums becomes [] and the length of the resulting array is 0.",
            },
          ],
          templateCode: {
            Python: "def removeElement(nums, val):\n    pass",
            Java: "class Solution {\n    int removeElement(int[] nums, int val) {\n        return 0;\n    }\n}",
            Cpp: "class Solution {\npublic:\n    int removeElement(vector<int>& nums, int val) {\n        return 0;\n    }\n};",
          },
          wrapperCode: {
            Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] nums = {nums};\n        int val = {val};\n        int result = sol.removeElement(nums, val);\n        System.out.println(result);\n    }\n}",
            Python:
              "if __name__ == '__main__':\n    nums = {nums}\n    val = {val}\n    result = removeElement(nums, val)\n    print(result)",
            Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> nums = {nums};\n    int val = {val};\n    int result = sol.removeElement(nums, val);\n    cout << result << endl;\n    return 0;\n}",
          },
        },
        {
          quesNo: 4,
          title: "Remove Duplicates from Sorted Array",
          description:
            "Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums.\n\nConsider the number of unique elements of nums to be k, to get accepted, you need to do the following things:\n\nChange the array nums such that the first k elements of nums contain the unique elements in the order they were present in nums initially. The remaining elements of nums are not important as well as the size of nums.\nReturn k.",
          constraint:
            "1 <= nums.length <= 3 * 10^4\n-100 <= nums[i] <= 100\nnums is sorted in non-decreasing order.",
          difficulty: "Easy",
          tag: ["Array", "Two Pointers"],
          leetcode:
            "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
          points: 10,
          cases: [
            {
              caseNumber: 1,
              input: ["nums", "[1,1,2]"],
              output: "2",
              explanation:
                "After removing the duplicates, nums becomes [1, 2] and the length of the resulting array is 2.",
            },
            {
              caseNumber: 2,
              input: ["nums", "[0,0,1,1,1,2,2,3,3,4]"],
              output: "5",
              explanation:
                "After removing the duplicates, nums becomes [0,1,2,3,4] and the length of the resulting array is 5.",
            },
            {
              caseNumber: 3,
              input: ["nums", "[1,1,1,1,1]"],
              output: "1",
              explanation:
                "After removing the duplicates, nums becomes [1] and the length of the resulting array is 1.",
            },
          ],
          templateCode: {
            Python: "def removeDuplicates(nums):\n    pass",
            Java: "class Solution {\n    int removeDuplicates(int[] nums) {\n        return 0;\n    }\n}",
            Cpp: "class Solution {\npublic:\n    int removeDuplicates(vector<int>& nums) {\n        return 0;\n    }\n};",
          },
          wrapperCode: {
            Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] nums = {nums};\n        int result = sol.removeDuplicates(nums);\n        System.out.println(result);\n    }\n}",
            Python:
              "if __name__ == '__main__':\n    nums = {nums}\n    result = removeDuplicates(nums)\n    print(result)",
            Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> nums = {nums};\n    int result = sol.removeDuplicates(nums);\n    cout << result << endl;\n    return 0;\n}",
          },
        },
        {
          quesNo: 6,
          title: "Majority Element",
          description:
            "Given an array nums of size n, return the majority element.\n\nThe majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.",
          constraint:
            "n == nums.length\n1 <= n <= 5 * 10^4\n-10^9 <= nums[i] <= 10^9",
          difficulty: "Easy",
          tag: [
            "Array",
            "Divide and Conquer",
            "Hash Table",
            "Sorting",
            "Counting",
          ],
          leetcode: "https://leetcode.com/problems/majority-element/",
          points: 10,
          cases: [
            {
              caseNumber: 1,
              input: ["nums", "[3,2,3]"],
              output: "3",
              explanation:
                "The number 3 appears more than ⌊3/2⌋ = 1 time, so it is the majority element.",
            },
            {
              caseNumber: 2,
              input: ["nums", "[2,2,1,1,1,2,2]"],
              output: "2",
              explanation:
                "The number 2 appears more than ⌊7/2⌋ = 3 times, so it is the majority element.",
            },
            {
              caseNumber: 3,
              input: ["nums", "[1,1,1,2,2,2,2,2]"],
              output: "2",
              explanation:
                "The number 2 appears 5 times, which is more than ⌊8/2⌋ = 4, so it is the majority element.",
            },
          ],
          templateCode: {
            Python: "def majorityElement(nums):\n    pass",
            Java: "class Solution {\n    int majorityElement(int[] nums) {\n        return 0;\n    }\n}",
            Cpp: "class Solution {\npublic:\n    int majorityElement(vector<int>& nums) {\n        return 0;\n    }\n};",
          },
          wrapperCode: {
            Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] nums = {nums};\n        int result = sol.majorityElement(nums);\n        System.out.println(result);\n    }\n}",
            Python:
              "if __name__ == '__main__':\n    nums = {nums}\n    result = majorityElement(nums)\n    print(result)",
            Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> nums = {nums};\n    int result = sol.majorityElement(nums);\n    cout << result << endl;\n    return 0;\n}",
          },
        },
        {
          quesNo: 8,
          title: "Best Time to Buy and Sell Stock",
          description:
            "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell it. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
          constraint: "1 <= prices.length <= 10^5\n0 <= prices[i] <= 10^4",
          difficulty: "Easy",
          tag: ["Array", "Dynamic Programming", "Greedy"],
          leetcode:
            "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
          points: 10,
          cases: [
            {
              caseNumber: 1,
              input: ["prices", "[7,1,5,3,6,4]"],
              output: "5",
              explanation:
                "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.",
            },
            {
              caseNumber: 2,
              input: ["prices", "[7,6,4,3,1]"],
              output: "0",
              explanation:
                "No transactions can be made since prices are always decreasing, so profit is 0.",
            },
            {
              caseNumber: 3,
              input: ["prices", "[2,4,1]"],
              output: "2",
              explanation:
                "Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit = 4 - 2 = 2.",
            },
          ],
          templateCode: {
            Python: "def maxProfit(prices):\n    pass",
            Java: "class Solution {\n    int maxProfit(int[] prices) {\n        return 0;\n    }\n}",
            Cpp: "class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        return 0;\n    }\n};",
          },
          wrapperCode: {
            Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] prices = {prices};\n        System.out.println(sol.maxProfit(prices));\n    }\n}",
            Python:
              "if __name__ == '__main__':\n    prices = {prices}\n    print(maxProfit(prices))",
            Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> prices = {prices};\n    cout << sol.maxProfit(prices) << endl;\n    return 0;\n}",
          },
        },
      ],
      Medium: [
        {
          quesNo: 5,
          title: "Remove Duplicates from Sorted Array II",
          description:
            "Given an integer array nums sorted in non-decreasing order, remove some duplicates in-place such that each unique element appears at most twice. The relative order of the elements should be kept the same.\n\nSince it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array nums. More formally, if there are k elements after removing the duplicates, then the first k elements of nums should hold the final result. It does not matter what you leave beyond the first k elements.\n\nReturn k after placing the final result in the first k slots of nums.\n\nDo not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.",
          constraint:
            "1 <= nums.length <= 3 * 10^4\n-10^4 <= nums[i] <= 10^4\nnums is sorted in non-decreasing order.",
          difficulty: "Medium",
          tag: ["Array", "Two Pointers"],
          leetcode:
            "https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/",
          points: 20,
          cases: [
            {
              caseNumber: 1,
              input: ["nums", "[1,1,1,2,2,3]"],
              output: "5",
              explanation:
                "After removing duplicates such that each unique element appears at most twice, nums becomes [1,1,2,2,3] and the length of the resulting array is 5.",
            },
            {
              caseNumber: 2,
              input: ["nums", "[0,0,1,1,1,1,2,3,3]"],
              output: "7",
              explanation:
                "After removing duplicates such that each unique element appears at most twice, nums becomes [0,0,1,1,2,3,3] and the length of the resulting array is 7.",
            },
            {
              caseNumber: 3,
              input: ["nums", "[1,1,1,1,2,2,3,3,3,3]"],
              output: "6",
              explanation:
                "After removing duplicates such that each unique element appears at most twice, nums becomes [1,1,2,2,3,3] and the length of the resulting array is 6.",
            },
          ],
          templateCode: {
            Python: "def removeDuplicates(nums):\n    pass",
            Java: "class Solution {\n    int removeDuplicates(int[] nums) {\n        return 0;\n    }\n}",
            Cpp: "class Solution {\npublic:\n    int removeDuplicates(vector<int>& nums) {\n        return 0;\n    }\n};",
          },
          wrapperCode: {
            Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] nums = {nums};\n        int result = sol.removeDuplicates(nums);\n        System.out.println(result);\n    }\n}",
            Python:
              "if __name__ == '__main__':\n    nums = {nums}\n    result = removeDuplicates(nums)\n    print(result)",
            Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> nums = {nums};\n    int result = sol.removeDuplicates(nums);\n    cout << result << endl;\n    return 0;\n}",
          },
        },
        {
          quesNo: 7,
          title: "Rotate Array",
          description:
            "Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.",
          constraint:
            "1 <= nums.length <= 10^5\n-2^31 <= nums[i] <= 2^31 - 1\n0 <= k <= 10^5",
          difficulty: "Medium",
          tag: ["Array", "Two Pointers", "Mathematics"],
          leetcode: "https://leetcode.com/problems/rotate-array/",
          points: 20,
          cases: [
            {
              caseNumber: 1,
              input: ["nums", "[1,2,3,4,5,6,7]", "k", "3"],
              output: "[5,6,7,1,2,3,4]",
              explanation:
                "After rotating 3 steps to the right, the array becomes [5,6,7,1,2,3,4].",
            },
            {
              caseNumber: 2,
              input: ["nums", "[-1,-100,3,99]", "k", "2"],
              output: "[3,99,-1,-100]",
              explanation:
                "After rotating 2 steps to the right, the array becomes [3,99,-1,-100].",
            },
            {
              caseNumber: 3,
              input: ["nums", "[1,2]", "k", "3"],
              output: "[2,1]",
              explanation:
                "Since k = 3 is equivalent to k = 1 for length 2, after rotating 1 step to the right, the array becomes [2,1].",
            },
          ],
          templateCode: {
            Python: "def rotate(nums, k):\n    pass",
            Java: "class Solution {\n    void rotate(int[] nums, int k) {\n        // Code goes here\n    }\n}",
            Cpp: "class Solution {\npublic:\n    void rotate(vector<int>& nums, int k) {\n        // Code goes here\n    }\n};",
          },
          wrapperCode: {
            Java: 'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] nums = {nums};\n        int k = {k};\n        sol.rotate(nums, k);\n        System.out.print("[");\n        for (int i = 0; i < nums.length; i++) {\n            System.out.print(nums[i]);\n            if (i < nums.length - 1) {\n                System.out.print(",");\n            }\n        }\n        System.out.println("]");\n    }\n}',
            Python:
              "import json\n\nif __name__ == '__main__':\n    nums = {nums}\n    k = {k}\n    rotate(nums, k)\n    print(json.dumps(nums, separators=(',', ':')))",
            Cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> nums = {nums};\n    int k = {k};\n    sol.rotate(nums, k);\n    cout << "[";\n    for (size_t i = 0; i < nums.size(); i++) {\n        cout << nums[i];\n        if (i != nums.size() - 1) cout << ",";\n    }\n    cout << "]" << endl;\n    return 0;\n}',
          },
        },
        {
          quesNo: 9,
          title: "Best Time to Buy and Sell Stock II",
          description:
            "You are given an integer array prices where prices[i] is the price of a given stock on the ith day.\nOn each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. However, you can buy it again immediately after you sell it.\nReturn the maximum profit you can achieve.",
          constraint: "1 <= prices.length <= 3 * 10^4\n0 <= prices[i] <= 10^4",
          difficulty: "Medium",
          tag: ["Array", "Greedy", "Dynamic Programming"],
          leetcode:
            "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/",
          points: 20,
          cases: [
            {
              caseNumber: 1,
              input: ["prices", "[7,1,5,3,6,4]"],
              output: "7",
              explanation:
                "Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4. Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3. Total profit is 4 + 3 = 7.",
            },
            {
              caseNumber: 2,
              input: ["prices", "[1,2,3,4,5]"],
              output: "4",
              explanation:
                "Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4. Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are engaging multiple transactions at the same time. You must sell before buying again.",
            },
            {
              caseNumber: 3,
              input: ["prices", "[7,6,4,3,1]"],
              output: "0",
              explanation:
                "In this case, no transaction is done, i.e. max profit = 0.",
            },
          ],
          templateCode: {
            Python: "def maxProfit(prices):\n    pass",
            Java: "class Solution {\n    int maxProfit(int[] prices) {\n        return 0;\n    }\n}",
            Cpp: "class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        return 0;\n    }\n};",
          },
          wrapperCode: {
            Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] prices = {prices};\n        int result = sol.maxProfit(prices);\n        System.out.println(result);\n    }\n}",
            Python:
              'if __name__ == "__main__":\n    prices = {prices}\n    print(maxProfit(prices))',
            Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> prices = {prices};\n    int result = sol.maxProfit(prices);\n    cout << result << endl;\n    return 0;\n}",
          },
        },
        {
          quesNo: 10,
          title: "Majority Element II",
          description:
            "Given an integer array of size n, find all elements that appear more than ⌊ n/3 ⌋ times in the array. The algorithm should run in O(n) time complexity and use O(1) space.",
          constraint: "1 <= nums.length <= 5 * 10^4\n-10^9 <= nums[i] <= 10^9",
          difficulty: "Medium",
          tag: ["Array", "HashMap", "Boyer-Moore Voting Algorithm"],
          leetcode: "https://leetcode.com/problems/majority-element-ii/",
          points: 20,
          cases: [
            {
              caseNumber: 1,
              input: ["nums", "[3,2,3]"],
              output: "[3]",
              explanation:
                "The majority element that appears more than n/3 times is 3.",
            },
            {
              caseNumber: 2,
              input: ["nums", "[1,1,1,3,3,2,2,2]"],
              output: "[1,2]",
              explanation:
                "Both 1 and 2 appear more than n/3 times in the array.",
            },
            {
              caseNumber: 3,
              input: ["nums", "[1]"],
              output: "[1]",
              explanation:
                "The only element in the array is 1, which appears more than n/3 times.",
            },
          ],
          templateCode: {
            Python: "def majorityElement(nums):\n    pass",
            Java: "class Solution {\n    List<Integer> majorityElement(int[] nums) {\n        return new ArrayList<>();\n    }\n}",
            Cpp: "class Solution {\npublic:\n    vector<int> majorityElement(vector<int>& nums) {\n        return {};\n    }\n};",
          },
          wrapperCode: {
            Java: 'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] nums = {nums};\n        List<Integer> result = sol.majorityElement(nums);\n        System.out.print("[");\n        for (int i = 0; i < result.size(); i++) {\n            System.out.print(result.get(i));\n            if (i < result.size() - 1) {\n                System.out.print(",");\n            }\n        }\n        System.out.println("]");\n    }\n}',
            Python:
              "import json\n\nif __name__ == \"__main__\":\n    nums = {nums}\n    result = majorityElement(nums)\n    print(json.dumps(result, separators=(',', ':')))",
            Cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> nums = {nums};\n    vector<int> result = sol.majorityElement(nums);\n    cout << "[";\n    for (size_t i = 0; i < result.size(); i++) {\n        cout << result[i];\n        if (i != result.size() - 1) cout << ",";\n    }\n    cout << "]" << endl;\n    return 0;\n}',
          },
        },
        {
          quesNo: 11,
          title: "Jump Game",
          description:
            "Given an array of non-negative integers nums, you are initially positioned at the first index. Each element in the array represents your maximum jump length from that position, and you are trying to reach the last index. Return true if you can reach the last index, otherwise return false.",
          constraint: "1 <= nums.length <= 10^4\n0 <= nums[i] <= 10^5",
          difficulty: "Medium",
          tag: ["Greedy", "Array"],
          leetcode: "https://leetcode.com/problems/jump-game/",
          points: 20,
          cases: [
            {
              caseNumber: 1,
              input: ["nums", "[2,3,1,1,4]"],
              output: "true",
              explanation:
                "Jump 1 step from index 0 to 1, then 3 steps to the last index.",
            },
            {
              caseNumber: 2,
              input: ["nums", "[3,2,1,0,4]"],
              output: "false",
              explanation:
                "You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.",
            },
            {
              caseNumber: 3,
              input: ["nums", "[0]"],
              output: "true",
              explanation:
                "The array has only one element, so we are already at the last index.",
            },
          ],
          templateCode: {
            Python: "def canJump(nums):\n    pass",
            Java: "class Solution {\n    boolean canJump(int[] nums) {\n        return false;\n    }\n}",
            Cpp: "class Solution {\npublic:\n    bool canJump(vector<int>& nums) {\n        return false;\n    }\n};",
          },
          wrapperCode: {
            Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] nums = {nums};\n        boolean result = sol.canJump(nums);\n        System.out.println(result);\n    }\n}",
            Python:
              'if __name__ == "__main__":\n    nums = {nums}\n    print(canJump(nums))',
            Cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> nums = {nums};\n    bool result = sol.canJump(nums);\n    cout << (result ? "true" : "false") << endl;\n    return 0;\n}',
          },
        },
        {
          quesNo: 12,
          title: "Jump Game II",
          description:
            "Given an array of non-negative integers nums, you are initially positioned at the first index. Each element in the array represents your maximum jump length from that position. Your goal is to reach the last index with the minimum number of jumps. Return the minimum number of jumps required to reach the last index.",
          constraint: "1 <= nums.length <= 10^4\n0 <= nums[i] <= 1000",
          difficulty: "Medium",
          tag: ["Greedy", "Array", "Dynamic Programming"],
          leetcode: "https://leetcode.com/problems/jump-game-ii/",
          points: 20,
          cases: [
            {
              caseNumber: 1,
              input: ["nums", "[2,3,1,1,4]"],
              output: "2",
              explanation:
                "The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.",
            },
            {
              caseNumber: 2,
              input: ["nums", "[2,3,0,1,4]"],
              output: "2",
              explanation:
                "The minimum number of jumps to reach the last index is 2.",
            },
            {
              caseNumber: 3,
              input: ["nums", "[1,1,1,1]"],
              output: "3",
              explanation:
                "The minimum number of jumps to reach the last index is 3.",
            },
          ],
          templateCode: {
            Python: "def jump(nums):\n    pass",
            Java: "class Solution {\n    int jump(int[] nums) {\n        return 0;\n    }\n}",
            Cpp: "class Solution {\npublic:\n    int jump(vector<int>& nums) {\n        return 0;\n    }\n};",
          },
          wrapperCode: {
            Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] nums = {nums};\n        int result = sol.jump(nums);\n        System.out.println(result);\n    }\n}",
            Python:
              'if __name__ == "__main__":\n    nums = {nums}\n    print(jump(nums))',
            Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> nums = {nums};\n    int result = sol.jump(nums);\n    cout << result << endl;\n    return 0;\n}",
          },
        },
        {
          quesNo: 13,
          title: "H-Index",
          description:
            "Given an array of integers citations where citations[i] is the number of citations a researcher received for their ith paper, return the researcher's h-index. According to the definition of h-index on Wikipedia: A researcher has index h if h of their n papers have at least h citations each, and the other n − h papers have no more than h citations each.",
          constraint:
            "n == citations.length\n1 <= n <= 5000\n0 <= citations[i] <= 1000",
          difficulty: "Medium",
          tag: ["Array", "Sorting", "Greedy"],
          leetcode: "https://leetcode.com/problems/h-index/",
          points: 20,
          cases: [
            {
              caseNumber: 1,
              input: ["citations", "[3,0,6,1,5]"],
              output: "3",
              explanation:
                "The h-index is 3 because the researcher has 3 papers with at least 3 citations each.",
            },
            {
              caseNumber: 2,
              input: ["citations", "[1,3,1]"],
              output: "1",
              explanation:
                "The h-index is 1 because the researcher has 1 paper with at least 1 citation.",
            },
            {
              caseNumber: 3,
              input: ["citations", "[10,8,5,4,3]"],
              output: "4",
              explanation:
                "The h-index is 4 because the researcher has 4 papers with at least 4 citations each.",
            },
          ],
          templateCode: {
            Python: "def hIndex(citations):\n    pass",
            Java: "class Solution {\n    int hIndex(int[] citations) {\n        return 0;\n    }\n}",
            Cpp: "class Solution {\npublic:\n    int hIndex(vector<int>& citations) {\n        return 0;\n    }\n};",
          },
          wrapperCode: {
            Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] citations = {citations};\n        int result = sol.hIndex(citations);\n        System.out.println(result);\n    }\n}",
            Python:
              'if __name__ == "__main__":\n    citations = {citations}\n    print(hIndex(citations))',
            Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> citations = {citations};\n    int result = sol.hIndex(citations);\n    cout << result << endl;\n    return 0;\n}",
          },
        },

        {
          quesNo: 15,
          title: "Product of Array Except Self",
          description:
            "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].\n\nThe product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.\n\nYou must write an algorithm that runs in O(n) time and without using the division operation.",
          constraint:
            "2 <= nums.length <= 10^5\n-30 <= nums[i] <= 30\nThe product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.",
          difficulty: "Medium",
          tag: ["Array", "Prefix Sum"],
          leetcode:
            "https://leetcode.com/problems/product-of-array-except-self/",
          points: 20,
          cases: [
            {
              caseNumber: 1,
              input: ["nums", "[1,2,3,4]"],
              output: "[24,12,8,6]",
              explanation:
                "The product of the elements except the current one for each index.",
            },
            {
              caseNumber: 2,
              input: ["nums", "[-1,1,0,-3,3]"],
              output: "[0,0,9,0,0]",
              explanation:
                "Since there's a zero in the array, all products except the one at zero's position will be zero.",
            },
            {
              caseNumber: 3,
              input: ["nums", "[1,1]"],
              output: "[1,1]",
              explanation: "Each element's product is the other element.",
            },
          ],
          templateCode: {
            Python: "def productExceptSelf(nums):\n    pass",
            Java: "class Solution {\n    int[] productExceptSelf(int[] nums) {\n        return new int[]{};\n    }\n}",
            Cpp: "class Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        return {};\n    }\n};",
          },
          wrapperCode: {
            Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] nums = {nums};\n        int[] result = sol.productExceptSelf(nums);\n        System.out.println(Arrays.toString(result));\n    }\n}",
            Python:
              'if __name__ == "__main__":\n    nums = {nums}\n    print(productExceptSelf(nums))',
            Cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> nums = {nums};\n    vector<int> result = sol.productExceptSelf(nums);\n    cout << "[";\n    for (size_t i = 0; i < result.size(); i++) {\n        cout << result[i];\n        if (i != result.size() - 1) cout << ",";\n    }\n    cout << "]" << endl;\n    return 0;\n}',
          },
        },
        {
          quesNo: 16,
          title: "Gas Station",
          description:
            "There are n gas stations along a circular route, where the amount of gas at the ith station is gas[i].\n\nYou have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the ith station to its next (i + 1)th station. You begin the journey with an empty tank at one of the gas stations.\n\nGiven two integer arrays gas and cost, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1.\n\nIf there exists a solution, it is guaranteed to be unique.",
          constraint: "1 <= gas.length <= 10^4\n0 <= gas[i], cost[i] <= 10^4",
          difficulty: "Medium",
          tag: ["Array", "Greedy"],
          leetcode: "https://leetcode.com/problems/gas-station/",
          points: 20,
          cases: [
            {
              caseNumber: 1,
              input: ["gas", "[1,2,3,4,5]", "cost", "[3,4,5,1,2]"],
              output: "3",
              explanation:
                "Start at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 0 + 4 = 4. Travel to station 4. Your tank = 4 - 1 + 5 = 8. Travel to station 0. Your tank = 8 - 2 + 1 = 7. Travel to station 1. Your tank = 7 - 3 + 2 = 6. Travel to station 2. Your tank = 6 - 4 + 3 = 5. Travel to station 3. The cost is 5. Your gas is just enough to travel back to station 3. Therefore, return 3 as the starting index.",
            },
            {
              caseNumber: 2,
              input: ["gas", "[2,3,4]", "cost", "[3,4,3]"],
              output: "-1",
              explanation:
                "You can't start at station 0 or 1, as there is not enough gas to travel to the next station. Let's start at station 2 and fill up with 4 unit of gas. Your tank = 0 + 4 = 4. Travel to station 0. Your tank = 4 - 3 + 2 = 3. Travel to station 1. Your tank = 3 - 3 + 3 = 3. You cannot travel back to station 2, as it requires 4 unit of gas but you only have 3. Therefore, you can't travel around the circuit once no matter where you start.",
            },
            {
              caseNumber: 3,
              input: ["gas", "[5,1,2,3,4]", "cost", "[4,4,1,5,1]"],
              output: "4",
              explanation:
                "Starting from station 4, the car can complete the circuit.",
            },
          ],
          templateCode: {
            Python: "def canCompleteCircuit(gas, cost):\n    pass",
            Java: "class Solution {\n    int canCompleteCircuit(int[] gas, int[] cost) {\n        return -1;\n    }\n}",
            Cpp: "class Solution {\npublic:\n    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {\n        return -1;\n    }\n};",
          },
          wrapperCode: {
            Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] gas = {gas};\n        int[] cost = {cost};\n        int result = sol.canCompleteCircuit(gas, cost);\n        System.out.println(result);\n    }\n}",
            Python:
              'if __name__ == "__main__":\n    gas = {gas}\n    cost = {cost}\n    print(canCompleteCircuit(gas, cost))',
            Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> gas = {gas};\n    vector<int> cost = {cost};\n    int result = sol.canCompleteCircuit(gas, cost);\n    cout << result << endl;\n    return 0;\n}",
          },
        },
      ],
      Hard: [
        {
          quesNo: 17,
          title: "Candy",
          description:
            "There are n children standing in a line. Each child is assigned a rating value given in the integer array ratings.\n\nYou are giving candies to these children subjected to the following requirements:\n\nEach child must have at least one candy.\nChildren with a higher rating get more candies than their neighbors.\n\nReturn the minimum number of candies you need to have to distribute the candies to the children.",
          constraint:
            "n == ratings.length\n1 <= n <= 2 * 10^4\n0 <= ratings[i] <= 2 * 10^4",
          difficulty: "Hard",
          tag: ["Array", "Greedy"],
          leetcode: "https://leetcode.com/problems/candy/",
          points: 40,
          cases: [
            {
              caseNumber: 1,
              input: ["ratings", "[1,0,2]"],
              output: "5",
              explanation:
                "You can allocate to the first, second and third child with 2, 1, 2 candies respectively.",
            },
            {
              caseNumber: 2,
              input: ["ratings", "[1,2,2]"],
              output: "4",
              explanation:
                "You can allocate to the first, second and third child with 1, 2, 1 candies respectively. The third child gets 1 candy because it satisfies the above two conditions.",
            },
            {
              caseNumber: 3,
              input: ["ratings", "[1,3,2,2,1]"],
              output: "7",
              explanation:
                "You can allocate to the children with [1,2,1,2,1] candies respectively.",
            },
          ],
          templateCode: {
            Python: "def candy(ratings):\n    pass",
            Java: "class Solution {\n    int candy(int[] ratings) {\n        return 0;\n    }\n}",
            Cpp: "class Solution {\npublic:\n    int candy(vector<int>& ratings) {\n        return 0;\n    }\n};",
          },
          wrapperCode: {
            Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] ratings = {ratings};\n        int result = sol.candy(ratings);\n        System.out.println(result);\n    }\n}",
            Python:
              'if __name__ == "__main__":\n    ratings = {ratings}\n    print(candy(ratings))',
            Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> ratings = {ratings};\n    int result = sol.candy(ratings);\n    cout << result << endl;\n    return 0;\n}",
          },
        },
        {
          quesNo: 18,
          title: "Trapping Rain Water",
          description:
            "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
          constraint:
            "n == height.length\n1 <= n <= 2 * 10^4\n0 <= height[i] <= 3 * 10^4",
          difficulty: "Hard",
          tag: [
            "Array",
            "Two Pointers",
            "Dynamic Programming",
            "Stack",
            "Monotonic Stack",
          ],
          leetcode: "https://leetcode.com/problems/trapping-rain-water/",
          points: 40,
          cases: [
            {
              caseNumber: 1,
              input: ["height", "[0,1,0,2,1,0,1,3,2,1,2,1]"],
              output: "6",
              explanation:
                "The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.",
            },
            {
              caseNumber: 2,
              input: ["height", "[4,2,0,3,2,5]"],
              output: "9",
              explanation:
                "The trapped water forms between the elevation bars.",
            },
            {
              caseNumber: 3,
              input: ["height", "[3,0,2,0,4]"],
              output: "7",
              explanation: "The trapped water is 7 units.",
            },
          ],
          templateCode: {
            Python: "def trap(height):\n    pass",
            Java: "class Solution {\n    int trap(int[] height) {\n        return 0;\n    }\n}",
            Cpp: "class Solution {\npublic:\n    int trap(vector<int>& height) {\n        return 0;\n    }\n};",
          },
          wrapperCode: {
            Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] height = {height};\n        int result = sol.trap(height);\n        System.out.println(result);\n    }\n}",
            Python:
              'if __name__ == "__main__":\n    height = {height}\n    print(trap(height))',
            Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> height = {height};\n    int result = sol.trap(height);\n    cout << result << endl;\n    return 0;\n}",
          },
        },
      ],
    },
  },
  {
    topic: "Strings",
    level: {
      Easy: [
        {
          quesNo: 19,
          title: "Roman to Integer",
          description:
            "Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.\n\nSymbol       Value\nI             1\nV             5\nX             10\nL             50\nC             100\nD             500\nM             1000\n\nFor example, 2 is written as II in Roman numeral, just two ones added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.\n\nRoman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:\n\nI can be placed before V (5) and X (10) to make 4 and 9.\nX can be placed before L (50) and C (100) to make 40 and 90.\nC can be placed before D (500) and M (1000) to make 400 and 900.\nGiven a roman numeral, convert it to an integer.",
          constraint:
            "1 <= s.length <= 15\ns contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').\nIt is guaranteed that s is a valid roman numeral in the range [1, 3999].",
          difficulty: "Easy",
          tag: ["Hash Table", "Math", "String"],
          leetcode: "https://leetcode.com/problems/roman-to-integer/",
          points: 10,
          cases: [
            {
              caseNumber: 1,
              input: ["s", '"III"'],
              output: "3",
              explanation: "III = 3.",
            },
            {
              caseNumber: 2,
              input: ["s", '"LVIII"'],
              output: "58",
              explanation: "L = 50, V= 5, III = 3.",
            },
            {
              caseNumber: 3,
              input: ["s", '"MCMXCIV"'],
              output: "1994",
              explanation: "M = 1000, CM = 900, XC = 90 and IV = 4.",
            },
          ],
          templateCode: {
            Python: "def romanToInt(s):\n    pass",
            Java: "class Solution {\n    int romanToInt(String s) {\n        return 0;\n    }\n}",
            Cpp: "class Solution {\npublic:\n    int romanToInt(string s) {\n        return 0;\n    }\n};",
          },
          wrapperCode: {
            Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        String s = {s};\n        int result = sol.romanToInt(s);\n        System.out.println(result);\n    }\n}",
            Python:
              'if __name__ == "__main__":\n    s = {s}\n    print(romanToInt(s))',
            Cpp: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    string s = {s};\n    int result = sol.romanToInt(s);\n    cout << result << endl;\n    return 0;\n}",
          },
        },
        {
          quesNo: 21,
          title: "Length of Last Word",
          description:
            "Given a string s consisting of words and spaces, return the length of the last word in the string.\n\nA word is a maximal substring consisting of non-space characters only.",
          constraint:
            "1 <= s.length <= 10^4\ns consists of only English letters and spaces ' '.\nThere is at least one word in s.",
          difficulty: "Easy",
          tag: ["String"],
          leetcode: "https://leetcode.com/problems/length-of-last-word/",
          points: 10,
          cases: [
            {
              caseNumber: 1,
              input: ["s", '"Hello World"'],
              output: "5",
              explanation: 'The last word is "World" with length 5.',
            },
            {
              caseNumber: 2,
              input: ["s", '"   fly me   to   the moon  "'],
              output: "4",
              explanation: 'The last word is "moon" with length 4.',
            },
            {
              caseNumber: 3,
              input: ["s", '"luffy is still joyboy"'],
              output: "6",
              explanation: 'The last word is "joyboy" with length 6.',
            },
          ],
          templateCode: {
            Python: "def lengthOfLastWord(s):\n    pass",
            Java: "class Solution {\n    int lengthOfLastWord(String s) {\n        return 0;\n    }\n}",
            Cpp: "class Solution {\npublic:\n    int lengthOfLastWord(string s) {\n        return 0;\n    }\n};",
          },
          wrapperCode: {
            Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        String s = {s};\n        int result = sol.lengthOfLastWord(s);\n        System.out.println(result);\n    }\n}",
            Python:
              'if __name__ == "__main__":\n    s = {s}\n    print(lengthOfLastWord(s))',
            Cpp: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    string s = {s};\n    int result = sol.lengthOfLastWord(s);\n    cout << result << endl;\n    return 0;\n}",
          },
        },
        {
          quesNo: 24,
          title: "Find the Index of the First Occurrence in a String",
          description:
            "Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.",
          constraint:
            "1 <= haystack.length, needle.length <= 10^4\nhaystack and needle consist of only lowercase English characters.",
          difficulty: "Easy",
          tag: ["Two Pointers", "String", "String Matching"],
          leetcode:
            "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/",
          points: 10,
          cases: [
            {
              caseNumber: 1,
              input: ["haystack", '"sadbutsad"', "needle", '"sad"'],
              output: "0",
              explanation:
                '"sad" occurs at index 0 and 6. The first occurrence is at index 0, so we return 0.',
            },
            {
              caseNumber: 2,
              input: ["haystack", '"leetcode"', "needle", '"leeto"'],
              output: "-1",
              explanation:
                '"leeto" did not occur in "leetcode", so we return -1.',
            },
            {
              caseNumber: 3,
              input: ["haystack", '"hello"', "needle", '"ll"'],
              output: "2",
              explanation: '"ll" occurs at index 2 in "hello".',
            },
          ],
          templateCode: {
            Python: "def strStr(haystack, needle):\n    pass",
            Java: "class Solution {\n    int strStr(String haystack, String needle) {\n        return -1;\n    }\n}",
            Cpp: "class Solution {\npublic:\n    int strStr(string haystack, string needle) {\n        return -1;\n    }\n};",
          },
          wrapperCode: {
            Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        String haystack = {haystack};\n        String needle = {needle};\n        int result = sol.strStr(haystack, needle);\n        System.out.println(result);\n    }\n}",
            Python:
              'if __name__ == "__main__":\n    haystack = {haystack}\n    needle = {needle}\n    print(strStr(haystack, needle))',
            Cpp: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    string haystack = {haystack};\n    string needle = {needle};\n    int result = sol.strStr(haystack, needle);\n    cout << result << endl;\n    return 0;\n}",
          },
        },
      ],
      Medium: [
        {
          quesNo: 20,
          title: "Integer to Roman",
          description:
            "Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.\n\nSymbol       Value\nI             1\nV             5\nX             10\nL             50\nC             100\nD             500\nM             1000\n\nFor example, 2 is written as II in Roman numeral, just two ones added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.\n\nRoman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:\n\nI can be placed before V (5) and X (10) to make 4 and 9.\nX can be placed before L (50) and C (100) to make 40 and 90.\nC can be placed before D (500) and M (1000) to make 400 and 900.\n\nGiven an integer, convert it to a roman numeral.",
          constraint: "1 <= num <= 3999",
          difficulty: "Medium",
          tag: ["Hash Table", "Math", "String"],
          leetcode: "https://leetcode.com/problems/integer-to-roman/",
          points: 20,
          cases: [
            {
              caseNumber: 1,
              input: ["num", "3"],
              output: '"III"',
              explanation: "3 is represented as 3 ones.",
            },
            {
              caseNumber: 2,
              input: ["num", "58"],
              output: '"LVIII"',
              explanation: "L = 50, V = 5, III = 3.",
            },
            {
              caseNumber: 3,
              input: ["num", "1994"],
              output: '"MCMXCIV"',
              explanation: "M = 1000, CM = 900, XC = 90 and IV = 4.",
            },
          ],
          templateCode: {
            Python: "def intToRoman(num):\n    pass",
            Java: 'class Solution {\n    String intToRoman(int num) {\n        return "";\n    }\n}',
            Cpp: 'class Solution {\npublic:\n    string intToRoman(int num) {\n        return "";\n    }\n};',
          },
          wrapperCode: {
            Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int num = {num};\n        String result = sol.intToRoman(num);\n        System.out.println('\"' + result + '\"');\n    }\n}",
            Python:
              'if __name__ == "__main__":\n    num = {num}\n    result = intToRoman(num)\n    print(f\'"{result}"\')',
            Cpp: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    int num = {num};\n    string result = sol.intToRoman(num);\n    cout << '\"' << result << '\"' << endl;\n    return 0;\n}",
          },
        },
        {
          quesNo: 22,
          title: "Reverse Words in a String",
          description:
            "Given an input string s, reverse the order of the words.\n\nA word is defined as a sequence of non-space characters. The words in s will be separated by at least one space.\n\nReturn a string of the words in reverse order concatenated by a single space.\n\nNote that s may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.",
          constraint:
            "1 <= s.length <= 10^4\ns contains English letters (upper-case and lower-case), digits, and spaces ' '.\nThere is at least one word in s.",
          difficulty: "Medium",
          tag: ["Two Pointers", "String"],
          leetcode: "https://leetcode.com/problems/reverse-words-in-a-string/",
          points: 20,
          cases: [
            {
              caseNumber: 1,
              input: ["s", '"the sky is blue"'],
              output: '"blue is sky the"',
              explanation: "The words are reversed in order.",
            },
            {
              caseNumber: 2,
              input: ["s", '"  hello world  "'],
              output: '"world hello"',
              explanation:
                "Your reversed string should not contain leading or trailing spaces.",
            },
            {
              caseNumber: 3,
              input: ["s", '"a good   example"'],
              output: '"example good a"',
              explanation:
                "You need to reduce multiple spaces between two words to a single space in the reversed string.",
            },
          ],
          templateCode: {
            Python: "def reverseWords(s):\n    pass",
            Java: 'class Solution {\n    String reverseWords(String s) {\n        return "";\n    }\n}',
            Cpp: 'class Solution {\npublic:\n    string reverseWords(string s) {\n        return "";\n    }\n};',
          },
          wrapperCode: {
            Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        String s = {s};\n        String result = sol.reverseWords(s);\n        System.out.println('\"' + result + '\"');\n    }\n}",
            Python:
              'if __name__ == "__main__":\n    s = {s}\n    result = reverseWords(s)\n    print(f\'"{result}"\')',
            Cpp: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    string s = {s};\n    string result = sol.reverseWords(s);\n    cout << '\"' << result << '\"' << endl;\n    return 0;\n}",
          },
        },
        {
          quesNo: 23,
          title: "Zigzag Conversion",
          description:
            'The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)\n\nP   A   H   R\nA P L S I I G\nY   I   R\n\nAnd then read line by line: "PAHNAPLSIIGYIR"\n\nWrite the code that will take a string and make this conversion given a number of rows:\n\nstring convert(string s, int numRows);',
          constraint:
            "1 <= s.length <= 1000\ns consists of English letters (lower-case and upper-case), ',' and '.'.\n1 <= numRows <= 1000",
          difficulty: "Medium",
          tag: ["String"],
          leetcode: "https://leetcode.com/problems/zigzag-conversion/",
          points: 20,
          cases: [
            {
              caseNumber: 1,
              input: ["s", '"PAYPALISHIRING"', "numRows", "3"],
              output: '"PAHNAPLSIIGYIR"',
              explanation:
                "The string is converted to zigzag pattern with 3 rows.",
            },
            {
              caseNumber: 2,
              input: ["s", '"PAYPALISHIRING"', "numRows", "4"],
              output: '"PINALSIGYAHRPI"',
              explanation:
                "The string is converted to zigzag pattern with 4 rows.",
            },
            {
              caseNumber: 3,
              input: ["s", '"A"', "numRows", "1"],
              output: '"A"',
              explanation: "With only 1 row, the string remains unchanged.",
            },
          ],
          templateCode: {
            Python: "def convert(s, numRows):\n    pass",
            Java: 'class Solution {\n    String convert(String s, int numRows) {\n        return "";\n    }\n}',
            Cpp: 'class Solution {\npublic:\n    string convert(string s, int numRows) {\n        return "";\n    }\n};',
          },
          wrapperCode: {
            Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        String s = {s};\n        int numRows = {numRows};\n        String result = sol.convert(s, numRows);\n        System.out.println('\"' + result + '\"');\n    }\n}",
            Python:
              'if __name__ == "__main__":\n    s = {s}\n    numRows = {numRows}\n    result = convert(s, numRows)\n    print(f\'"{result}"\')',
            Cpp: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    string s = {s};\n    int numRows = {numRows};\n    string result = sol.convert(s, numRows);\n    cout << '\"' << result << '\"' << endl;\n    return 0;\n}",
          },
        },
      ],
      Hard: [
        {
          quesNo: 25,
          title: "Text Justification",
          description:
            "Given an array of strings words and a width maxWidth, format the text such that each line has exactly maxWidth characters and is fully (left and right) justified.\n\nYou should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces ' ' when necessary so that each line has exactly maxWidth characters.\n\nExtra spaces between words should be distributed as evenly as possible. If the number of spaces on a line does not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.\n\nFor the last line of text, it should be left-justified, and no extra space is inserted between words.\n\nNote:\n\nA word is defined as a character sequence consisting of non-space characters only.\nEach word's length is guaranteed to be greater than 0 and not exceed maxWidth.\nThe input array words contains at least one word.",
          constraint:
            "1 <= words.length <= 300\n1 <= words[i].length <= 20\nwords[i] consists of only English letters and symbols.\n1 <= maxWidth <= 100\nwords[i].length <= maxWidth",
          difficulty: "Hard",
          tag: ["Array", "String", "Simulation"],
          leetcode: "https://leetcode.com/problems/text-justification/",
          points: 40,
          cases: [
            {
              caseNumber: 1,
              input: [
                "words",
                '["This", "is", "an", "example", "of", "text", "justification."]',
                "maxWidth",
                "16",
              ],
              output:
                '["This    is    an", "example  of text", "justification.  "]',
              explanation:
                "Lines are justified to exactly 16 characters with spaces distributed evenly.",
            },
            {
              caseNumber: 2,
              input: [
                "words",
                '["What","must","be","acknowledgment","shall","be"]',
                "maxWidth",
                "16",
              ],
              output:
                '["What   must   be", "acknowledgment  ", "shall be        "]',
              explanation:
                'Note that the last line "shall be    " instead of "shall     be", because the last line must be left-justified instead of fully-justified.',
            },
            {
              caseNumber: 3,
              input: [
                "words",
                '["Science","is","what","we","understand","well","enough","to","explain","to","a","computer.","Art","is","everything","else","we","do"]',
                "maxWidth",
                "20",
              ],
              output:
                '["Science  is  what we", "understand      well", "enough to explain to", "a  computer.  Art is", "everything  else  we", "do                  "]',
              explanation: "Each line is exactly 20 characters long.",
            },
          ],
          templateCode: {
            Python: "def fullJustify(words, maxWidth):\n    pass",
            Java: "class Solution {\n    List<String> fullJustify(String[] words, int maxWidth) {\n        return new ArrayList<>();\n    }\n}",
            Cpp: "class Solution {\npublic:\n    vector<string> fullJustify(vector<string>& words, int maxWidth) {\n        return {};\n    }\n};",
          },
          wrapperCode: {
            Java: 'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        String[] words = {words};\n        int maxWidth = {maxWidth};\n        List<String> result = sol.fullJustify(words, maxWidth);\n        System.out.print("[");\n        for (int i = 0; i < result.size(); i++) {\n            System.out.print("\\"" + result.get(i) + "\\"");\n            if (i < result.size() - 1) System.out.print(", ");\n        }\n        System.out.println("]");\n    }\n}',
            Python:
              'import json\n\nif __name__ == "__main__":\n    words = {words}\n    maxWidth = {maxWidth}\n    result = fullJustify(words, maxWidth)\n    print(json.dumps(result))',
            Cpp: '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<string> words = {words};\n    int maxWidth = {maxWidth};\n    vector<string> result = sol.fullJustify(words, maxWidth);\n    cout << "[";\n    for (size_t i = 0; i < result.size(); i++) {\n        cout << "\\"" << result[i] << "\\"";\n        if (i != result.size() - 1) cout << ", ";\n    }\n    cout << "]" << endl;\n    return 0;\n}',
          },
        },
      ],
    },
  },
  {
    topic: "Two Pointers",
    level: {
      Easy: [
        {
          quesNo: 26,
          title: "Valid Palindrome",
          description:
            "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.\n\nGiven a string s, return true if it is a palindrome, or false otherwise.",
          constraint:
            "1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.",
          difficulty: "Easy",
          tag: ["Two Pointers", "String"],
          leetcode: "https://leetcode.com/problems/valid-palindrome/",
          points: 10,
          cases: [
            {
              caseNumber: 1,
              input: ["s", '"A man, a plan, a canal: Panama"'],
              output: "true",
              explanation: '"amanaplanacanalpanama" is a palindrome.',
            },
            {
              caseNumber: 2,
              input: ["s", '"race a car"'],
              output: "false",
              explanation: '"raceacar" is not a palindrome.',
            },
            {
              caseNumber: 3,
              input: ["s", '" "'],
              output: "true",
              explanation:
                's is an empty string "" after removing non-alphanumeric characters. Since an empty string reads the same forward and backward, it is a palindrome.',
            },
          ],
          templateCode: {
            Python: "def isPalindrome(s):\n    pass",
            Java: "class Solution {\n    boolean isPalindrome(String s) {\n        return false;\n    }\n}",
            Cpp: "class Solution {\npublic:\n    bool isPalindrome(string s) {\n        return false;\n    }\n};",
          },
          wrapperCode: {
            Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        String s = {s};\n        System.out.println(sol.isPalindrome(s));\n    }\n}",
            Python:
              'if __name__ == "__main__":\n    s = {s}\n    print(isPalindrome(s))',
            Cpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    string s = {s};\n    cout << (sol.isPalindrome(s) ? "true" : "false") << endl;\n    return 0;\n}',
          },
        },
        {
          quesNo: 27,
          title: "Is Subsequence",
          description:
            'Given two strings s and t, return true if s is a subsequence of t, or false otherwise.\n\nA subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not).',
          constraint:
            "0 <= s.length <= 100\n0 <= t.length <= 10^4\ns and t consist only of lowercase English letters.",
          difficulty: "Easy",
          tag: ["Two Pointers", "String", "Dynamic Programming"],
          leetcode: "https://leetcode.com/problems/is-subsequence/",
          points: 10,
          cases: [
            {
              caseNumber: 1,
              input: ["s", '"abc"', "t", '"ahbgdc"'],
              output: "true",
              explanation: 'The subsequence "abc" can be formed from "ahbgdc".',
            },
            {
              caseNumber: 2,
              input: ["s", '"axc"', "t", '"ahbgdc"'],
              output: "false",
              explanation:
                '"axc" cannot be formed as a subsequence of "ahbgdc".',
            },
            {
              caseNumber: 3,
              input: ["s", '""', "t", '"ahbgdc"'],
              output: "true",
              explanation: "An empty string is a subsequence of any string.",
            },
          ],
          templateCode: {
            Python: "def isSubsequence(s, t):\n    pass",
            Java: "class Solution {\n    boolean isSubsequence(String s, String t) {\n        return false;\n    }\n}",
            Cpp: "class Solution {\npublic:\n    bool isSubsequence(string s, string t) {\n        return false;\n    }\n};",
          },
          wrapperCode: {
            Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        String s = {s};\n        String t = {t};\n        System.out.println(sol.isSubsequence(s, t));\n    }\n}",
            Python:
              'if __name__ == "__main__":\n    s = {s}\n    t = {t}\n    print(isSubsequence(s, t))',
            Cpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    string s = {s};\n    string t = {t};\n    cout << (sol.isSubsequence(s, t) ? "true" : "false") << endl;\n    return 0;\n}',
          },
        },
        {
          quesNo: 28,
          title: "Two Sum II - Input Array Is Sorted",
          description:
            "Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Let these two numbers be numbers[index1] and numbers[index2] where 1 <= index1 < index2 <= numbers.length.\n\nReturn the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.\n\nThe tests are generated such that there is exactly one solution. You may not use the same element twice.\n\nYour solution must use only constant extra space.",
          constraint:
            "2 <= numbers.length <= 3 * 10^4\n-1000 <= numbers[i] <= 1000\nnumbers is sorted in non-decreasing order.\n-1000 <= target <= 1000\nThe tests are generated such that there is exactly one solution.",
          difficulty: "Medium",
          tag: ["Array", "Two Pointers", "Binary Search"],
          leetcode:
            "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
          points: 10,
          cases: [
            {
              caseNumber: 1,
              input: ["numbers", "[2,7,11,15]", "target", "9"],
              output: "[1,2]",
              explanation:
                "The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].",
            },
            {
              caseNumber: 2,
              input: ["numbers", "[2,3,4]", "target", "6"],
              output: "[1,3]",
              explanation:
                "The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].",
            },
            {
              caseNumber: 3,
              input: ["numbers", "[-1,0]", "target", "-1"],
              output: "[1,2]",
              explanation:
                "The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].",
            },
          ],
          templateCode: {
            Python: "def twoSum(numbers, target):\n    pass",
            Java: "class Solution {\n    int[] twoSum(int[] numbers, int target) {\n        return new int[]{};\n    }\n}",
            Cpp: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& numbers, int target) {\n        return {};\n    }\n};",
          },
          wrapperCode: {
            Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] numbers = {numbers};\n        int target = {target};\n        int[] result = sol.twoSum(numbers, target);\n        System.out.println(Arrays.toString(result));\n    }\n}",
            Python:
              'if __name__ == "__main__":\n    numbers = {numbers}\n    target = {target}\n    print(twoSum(numbers, target))',
            Cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> numbers = {numbers};\n    int target = {target};\n    vector<int> result = sol.twoSum(numbers, target);\n    cout << "[";\n    for (size_t i = 0; i < result.size(); i++) {\n        cout << result[i];\n        if (i != result.size() - 1) cout << ",";\n    }\n    cout << "]" << endl;\n    return 0;\n}',
          },
        },
      ],
      Medium: [
        {
          quesNo: 29,
          title: "Container With Most Water",
          description:
            "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.\n\nNotice that you may not slant the container.",
          constraint:
            "n == height.length\n2 <= n <= 10^5\n0 <= height[i] <= 10^4",
          difficulty: "Medium",
          tag: ["Array", "Two Pointers", "Greedy"],
          leetcode: "https://leetcode.com/problems/container-with-most-water/",
          points: 20,
          cases: [
            {
              caseNumber: 1,
              input: ["height", "[1,8,6,2,5,4,8,3,7]"],
              output: "49",
              explanation:
                "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.",
            },
            {
              caseNumber: 2,
              input: ["height", "[1,1]"],
              output: "1",
              explanation:
                "The above vertical lines are represented by array [1,1]. In this case, the max area of water the container can contain is 1.",
            },
            {
              caseNumber: 3,
              input: ["height", "[4,3,2,1,4]"],
              output: "16",
              explanation:
                "The maximum water that can be contained is between the first and last line.",
            },
          ],
          templateCode: {
            Python: "def maxArea(height):\n    pass",
            Java: "class Solution {\n    int maxArea(int[] height) {\n        return 0;\n    }\n}",
            Cpp: "class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        return 0;\n    }\n};",
          },
          wrapperCode: {
            Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] height = {height};\n        System.out.println(sol.maxArea(height));\n    }\n}",
            Python:
              'if __name__ == "__main__":\n    height = {height}\n    print(maxArea(height))',
            Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> height = {height};\n    cout << sol.maxArea(height) << endl;\n    return 0;\n}",
          },
        },
        {
          quesNo: 30,
          title: "3Sum",
          description:
            "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.\n\nNotice that the solution set must not contain duplicate triplets.",
          constraint: "3 <= nums.length <= 3000\n-10^5 <= nums[i] <= 10^5",
          difficulty: "Medium",
          tag: ["Array", "Two Pointers", "Sorting"],
          leetcode: "https://leetcode.com/problems/3sum/",
          points: 20,
          cases: [
            {
              caseNumber: 1,
              input: ["nums", "[-1,0,1,2,-1,-4]"],
              output: "[[-1,-1,2],[-1,0,1]]",
              explanation:
                "nums[0] + nums[1] + nums = (-1) + 0 + 1 = 0. nums[1] + nums + nums = 0 + 1 + (-1) = 0. nums + nums + nums = (-1) + 2 + (-1) = 0. The distinct triplets are [-1,0,1] and [-1,-1,2]. Notice that the order of the output and the order of the triplets does not matter.",
            },
            {
              caseNumber: 2,
              input: ["nums", "[0,1,1]"],
              output: "[]",
              explanation: "The only possible triplet does not sum up to 0.",
            },
            {
              caseNumber: 3,
              input: ["nums", "[0,0,0]"],
              output: "[[0,0,0]]",
              explanation: "The only possible triplet sums up to 0.",
            },
          ],
          templateCode: {
            Python: "def threeSum(nums):\n    pass",
            Java: "class Solution {\n    List<List<Integer>> threeSum(int[] nums) {\n        return new ArrayList<>();\n    }\n}",
            Cpp: "class Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        return {};\n    }\n};",
          },
          wrapperCode: {
            Java: 'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] nums = {nums};\n        List<List<Integer>> result = sol.threeSum(nums);\n        System.out.print("[");\n        for (int i = 0; i < result.size(); i++) {\n            List<Integer> triplet = result.get(i);\n            System.out.print("[");\n            for (int j = 0; j < triplet.size(); j++) {\n                System.out.print(triplet.get(j));\n                if (j < triplet.size() - 1) System.out.print(",");\n            }\n            System.out.print("]");\n            if (i < result.size() - 1) System.out.print(",");\n        }\n        System.out.println("]");\n    }\n}',
            Python:
              "import json\n\nif __name__ == \"__main__\":\n    nums = {nums}\n    result = threeSum(nums)\n    print(json.dumps(result, separators=(',', ':')))",
            Cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> nums = {nums};\n    vector<vector<int>> result = sol.threeSum(nums);\n    cout << "[";\n    for (size_t i = 0; i < result.size(); i++) {\n        cout << "[";\n        for (size_t j = 0; j < result[i].size(); j++) {\n            cout << result[i][j];\n            if (j != result[i].size() - 1) cout << ",";\n        }\n        cout << "]";\n        if (i != result.size() - 1) cout << ",";\n    }\n    cout << "]" << endl;\n    return 0;\n}',
          },
        },
      ],
      Hard: [],
    },
  },
];

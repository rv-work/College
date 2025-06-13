interface Sheet {
  topic: string;
  level : {
    Easy : questions[];
    Medium : questions[];
    Hard : questions[];
  }
};

interface questions {
  quesNo: number; 
  title: string;
  description: string;
  constraint: string;
  tag: string[];
  leetcode: string;
  points: number;
  difficulty : string;
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

export const sheet : Sheet[] = [ 
  {
   topic : "Arrays",
   level : {
     Easy : [
      {
        quesNo : 1,
        title : "Two Sum",
        description : "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
        constraint : "2 <= nums.length <= 104 \n 109 <= nums[i] <= 109 \n -109 <= target <= 109 \n Only one valid answer exists.",
        difficulty : "Easy",
        tag : [ "Array"  , "HashTable"],
        leetcode : 'https://leetcode.com/problems/two-sum/description/',
        points : 10,
        cases : [
          {
            caseNumber  : 1,
            input       : ["nums " , "[2,7,11,15]" , "target " , "9"],
            output      : "[0,1]",
            explanation : "Because nums[0] + nums[1] == 9, we return [0, 1]."
          },
          {
            caseNumber  : 2,
            input       : ["nums " , "[3,2,4]" , "target " , "6"],
            output      : "[1,2]",
          },
          {
            caseNumber  : 3,
            input       : ["nums " , "[3,3]" , "target " , "6"],
            output      : "[0,1]",
          },
        ],
        templateCode: {
          Python: " from typing import List \n def two_sum(nums: list, target: int) -> list:\n   ",
          Java: "public class Solution {\n    public static int[] twoSum(int[] nums, int target) {\n        return new int[]{};\n    }\n}",
          Cpp: "class Solution {\n public: \n vector<int> twoSum(vector<int>& nums, int target) {\n    return {};\n} \n };"
        },
    
      wrapperCode:{
        Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] nums = {nums};\n        int target = {target};\n        int[] result = sol.twoSum(nums, target);\n        System.out.print(\"[\");\n        for (int i = 0; i < result.length; i++) {\n            System.out.print(result[i]);\n            if (i < result.length - 1) {\n                System.out.print(\",\");\n            }\n        }\n        System.out.println(\"]\");\n    }\n}",
      
        Python: "if __name__ == \"__main__\":\n    nums = {nums}\n    target = {target}\n    print(two_sum(nums, target))",
      
        Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> nums = {nums};\n    int target = {target};\n    vector<int> result = sol.twoSum(nums, target);\n    cout << \"[\";\n    for (size_t i = 0; i < result.size(); i++) {\n        cout << result[i];\n        if (i != result.size() - 1) cout << \",\";\n    }\n    cout << \"]\" << endl;\n    return 0;\n}"
      }
      },
      {
        quesNo: 2,
        title: "Merge Sorted Array",
        description: "You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.\n\nMerge nums1 and nums2 into a single array sorted in non-decreasing order.\n\nThe final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.",
        constraint: "nums1.length == m + n\nnums2.length == n\n0 <= m, n <= 200\n1 <= m + n <= 200\n-10^9 <= nums1[i], nums2[j] <= 10^9",
        difficulty: "Easy",
        tag: ["Array", "Two Pointers"],
        leetcode: "https://leetcode.com/problems/merge-sorted-array/",
        points: 10,
        cases: [
          {
            caseNumber: 1,
            input: ["nums1", "[1,2,3,0,0,0]", "m", "3", "nums2", "[2,5,6]", "n", "3"],
            output: "[1,2,2,3,5,6]",
            explanation: "Merge nums2 into nums1 such that the resulting array is sorted."
          },
          {
            caseNumber: 2,
            input: ["nums1", "[1]", "m", "1", "nums2", "[]", "n", "0"],
            output: "[1]",
            explanation: "Since nums2 is empty, the result is just nums1."
          },
          {
            caseNumber: 3,
            input: ["nums1", "[0]", "m", "0", "nums2", "[1]", "n", "1"],
            output: "[1]",
            explanation: "Merge nums2 into nums1 resulting in [1]."
          }
        ],
        templateCode: {
          Python: "from typing import List\n\ndef merge(nums1: List[int], m: int, nums2: List[int], n: int) -> None:\n    # Code goes here",
          Java: "public class Solution {\n    public void merge(int[] nums1, int m, int[] nums2, int n) {\n        // Code goes here\n    }\n}",
          Cpp: "class Solution {\n public: \n    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {\n        // Code goes here\n    }\n};"
        },
        wrapperCode: {
          Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] nums1 = {nums1};\n        int m = {m};\n        int[] nums2 = {nums2};\n        int n = {n};\n        sol.merge(nums1, m, nums2, n);\n        System.out.println(Arrays.toString(nums1));\n    }\n}",
          Python: "if __name__ == '__main__':\n    nums1 = {nums1}\n    m = {m}\n    nums2 = {nums2}\n    n = {n}\n    merge(nums1, m, nums2, n)\n    print(nums1)",
          Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> nums1 = {nums1};\n    int m = {m};\n    vector<int> nums2 = {nums2};\n    int n = {n};\n    sol.merge(nums1, m, nums2, n);\n    for (int i : nums1) cout << i << ' ';\n    return 0;\n}"
        }
      },
      {
        quesNo: 3,
        title: "Remove Element",
        description: "Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The order of the elements may be changed. Then return the number of elements in nums which are not equal to val.\n\nConsider the number of elements in nums which are not equal to val be k, to get accepted, you need to do the following things:\n\nChange the array nums such that the first k elements of nums contain the elements which are not equal to val. The remaining elements of nums are not important as well as the size of nums.\nReturn k.\n\nCustom Judge:\n\nThe judge will test your solution with the following code:\n\nint[] nums = [...]; // Input array\nint val = ...; // Value to remove\nint[] expectedNums = [...]; // The expected answer with correct length.\n// It is sorted with no values equaling val.\n\nint k = removeElement(nums, val); // Calls your implementation\n\nassert k == expectedNums.length;\nsort(nums, 0, k); // Sort the first k elements of nums\nfor (int i = 0; i < actualLength; i++) {\n    assert nums[i] == expectedNums[i];\n}\nIf all assertions pass, then your solution will be accepted.",
        constraint: "0 <= nums.length <= 100\n0 <= nums[i] <= 50\n0 <= val <= 100",
        difficulty: "Easy",
        tag: ["Array", "Two Pointers"],
        leetcode: "https://leetcode.com/problems/remove-element/",
        points: 10,
        cases: [
          {
            caseNumber: 1,
            input: ["nums", "[3,2,2,3]", "val", "3"],
            output: "2 \n  nums = [2,2,_,_]",
            explanation: "After removing all occurrences of 3, nums becomes [2,2] and the length of the resulting array is 2."
          },
          {
            caseNumber: 2,
            input: ["nums", "[0,1,2,2,3,0,4,2]", "val", "2"],
            output: "5 \n nums = [0,1,4,0,3,_,_,_]",
            explanation: "After removing all occurrences of 2, nums becomes [0,1,3,0,4] and the length of the resulting array is 5."
          },
          {
            caseNumber: 3,
            input: ["nums", "[2,2,2,2]", "val", "2"],
            output: "0",
            explanation: "After removing all occurrences of 2, nums becomes [] and the length of the resulting array is 0."
          }
        ],
        templateCode: {
          Python: "from typing import List\n\ndef removeElement(nums: List[int], val: int) -> int:\n    # Code goes here",
          Java: "public class Solution {\n    public int removeElement(int[] nums, int val) {\n        // Code goes here\n    }\n}",
          Cpp: "class Solution {\n public: \n    int removeElement(vector<int>& nums, int val) {\n        // Code goes here\n    }\n};"
        },
        wrapperCode: {
          Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] nums = {nums};\n        int val = {val};\n        int result = sol.removeElement(nums, val);\n        System.out.println(result);\n    }\n}",
          Python: "if __name__ == '__main__':\n    nums = {nums}\n    val = {val}\n    result = removeElement(nums, val)\n    print(result)",
          Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> nums = {nums};\n    int val = {val};\n    int result = sol.removeElement(nums, val);\n    cout << result << endl;\n    return 0;\n}"
        }
      },
      {
        quesNo: 4,
        title: "Remove Duplicates from Sorted Array",
        description: "Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums.\n\nConsider the number of unique elements of nums to be k, to get accepted, you need to do the following things:\n\nChange the array nums such that the first k elements of nums contain the unique elements in the order they were present in nums initially. The remaining elements of nums are not important as well as the size of nums.\nReturn k.\n\nCustom Judge:\n\nThe judge will test your solution with the following code:\n\nint[] nums = [...]; // Input array\nint[] expectedNums = [...]; // The expected answer with correct length\n\nint k = removeDuplicates(nums); // Calls your implementation\n\nassert k == expectedNums.length;\nfor (int i = 0; i < k; i++) {\n    assert nums[i] == expectedNums[i];\n}\nIf all assertions pass, then your solution will be accepted.",
        constraint: "1 <= nums.length <= 3 * 10^4\n-100 <= nums[i] <= 100\nnums is sorted in non-decreasing order.",
        difficulty: "Easy",
        tag: ["Array", "Two Pointers"],
        leetcode: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
        points: 10,
        cases: [
          {
            caseNumber: 1,
            input: ["nums", "[1,1,2]"],
            output: "2",
            explanation: "After removing the duplicates, nums becomes [1, 2] and the length of the resulting array is 2."
          },
          {
            caseNumber: 2,
            input: ["nums", "[0,0,1,1,1,2,2,3,3,4]"],
            output: "5",
            explanation: "After removing the duplicates, nums becomes [0,1,2,3,4] and the length of the resulting array is 5."
          },
          {
            caseNumber: 3,
            input: ["nums", "[1,1,1,1,1]"],
            output: "1",
            explanation: "After removing the duplicates, nums becomes [1] and the length of the resulting array is 1."
          }
        ],
        templateCode: {
          Python: "from typing import List\n\ndef removeDuplicates(nums: List[int]) -> int:\n    # Code goes here",
          Java: "public class Solution {\n    public int removeDuplicates(int[] nums) {\n        // Code goes here\n    }\n}",
          Cpp: "class Solution {\n public: \n    int removeDuplicates(vector<int>& nums) {\n        // Code goes here\n    }\n};"
        },
        wrapperCode: {
          Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] nums = {nums};\n        int result = sol.removeDuplicates(nums);\n        System.out.println(result);\n    }\n}",
          Python: "if __name__ == '__main__':\n    nums = {nums}\n    result = removeDuplicates(nums)\n    print(result)",
          Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> nums = {nums};\n    int result = sol.removeDuplicates(nums);\n    cout << result << endl;\n    return 0;\n}"
        }
      },
      {
        quesNo: 6,
        title: "Majority Element",
        description: "Given an array nums of size n, return the majority element.\n\nThe majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.",
        constraint: "n == nums.length\n1 <= n <= 5 * 10^4\n-10^9 <= nums[i] <= 10^9",
        difficulty: "Easy",
        tag: ["Array", "Divide and Conquer", "Hash Table", "Sorting", "Counting"],
        leetcode: "https://leetcode.com/problems/majority-element/",
        points: 10,
        cases: [
          {
            caseNumber: 1,
            input: ["nums", "[3,2,3]"],
            output: "3",
            explanation: "The number 3 appears more than ⌊3/2⌋ = 1 time, so it is the majority element."
          },
          {
            caseNumber: 2,
            input: ["nums", "[2,2,1,1,1,2,2]"],
            output: "2",
            explanation: "The number 2 appears more than ⌊7/2⌋ = 3 times, so it is the majority element."
          },
          {
            caseNumber: 3,
            input: ["nums", "[1,1,1,2,2,2,2,2]"],
            output: "2",
            explanation: "The number 2 appears 5 times, which is more than ⌊8/2⌋ = 4, so it is the majority element."
          }
        ],
        templateCode: {
          Python: "from typing import List\n\ndef majorityElement(nums: List[int]) -> int:\n    # Code goes here",
          Java: "public class Solution {\n    public int majorityElement(int[] nums) {\n        // Code goes here\n    }\n}",
          Cpp: "class Solution {\n public: \n    int majorityElement(vector<int>& nums) {\n        // Code goes here\n    }\n};"
        },
        wrapperCode: {
          Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] nums = {nums};\n        int result = sol.majorityElement(nums);\n        System.out.println(result);\n    }\n}",
          Python: "if __name__ == '__main__':\n    nums = {nums}\n    result = majorityElement(nums)\n    print(result)",
          Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> nums = {nums};\n    int result = sol.majorityElement(nums);\n    cout << result << endl;\n    return 0;\n}"
        }
      },
     
    {
      quesNo: 8,
      title: "Best Time to Buy and Sell Stock",
      description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell it. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
      constraint: "1 <= prices.length <= 10^5\n0 <= prices[i] <= 10^4",
      difficulty: "Easy",
      tag: ["Array", "Dynamic Programming", "Greedy"],
      leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
      points: 10,
      cases: [
        {
          caseNumber: 1,
          input: ["prices", "[7,1,5,3,6,4]"],
          output: "5",
          explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5."
        },
        {
          caseNumber: 2,
          input: ["prices", "[7,6,4,3,1]"],
          output: "0",
          explanation: "No transactions can be made since prices are always decreasing, so profit is 0."
        },
        {
          caseNumber: 3,
          input: ["prices", "[2,4,1]"],
          output: "2",
          explanation: "Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit = 4 - 2 = 2."
        }
      ],
      templateCode: {
        Python: "from typing import List\n\ndef maxProfit(prices: List[int]) -> int:\n    # Code goes here",
        Java: "public class Solution {\n    public int maxProfit(int[] prices) {\n        // Code goes here\n    }\n}",
        Cpp: "class Solution {\n public:\n    int maxProfit(vector<int>& prices) {\n        // Code goes here\n    }\n};"
      },
      wrapperCode: {
        Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] prices = {prices};\n        System.out.println(sol.maxProfit(prices));\n    }\n}",
        Python: "if __name__ == '__main__':\n    prices = {prices}\n    print(maxProfit(prices))",
        Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> prices = {prices};\n    cout << sol.maxProfit(prices) << endl;\n    return 0;\n}"
      }
    },
     ],
    Medium : [
      {
        quesNo: 5,
        title: "Remove Duplicates from Sorted Array II",
        description: "Given an integer array nums sorted in non-decreasing order, remove some duplicates in-place such that each unique element appears at most twice. The relative order of the elements should be kept the same.\n\nSince it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array nums. More formally, if there are k elements after removing the duplicates, then the first k elements of nums should hold the final result. It does not matter what you leave beyond the first k elements.\n\nReturn k after placing the final result in the first k slots of nums.\n\nDo not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.\n\nCustom Judge:\n\nThe judge will test your solution with the following code:\n\nint[] nums = [...]; // Input array\nint[] expectedNums = [...]; // The expected answer with correct length\n\nint k = removeDuplicates(nums); // Calls your implementation\n\nassert k == expectedNums.length;\nfor (int i = 0; i < k; i++) {\n    assert nums[i] == expectedNums[i];\n}\nIf all assertions pass, then your solution will be accepted.",
        constraint: "1 <= nums.length <= 3 * 10^4\n-10^4 <= nums[i] <= 10^4\nnums is sorted in non-decreasing order.",
        difficulty: "Medium",
        tag: ["Array", "Two Pointers"],
        leetcode: "https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/",
        points: 20,
        cases: [
          {
            caseNumber: 1,
            input: ["nums", "[1,1,1,2,2,3]"],
            output: "5",
            explanation: "After removing duplicates such that each unique element appears at most twice, nums becomes [1,1,2,2,3] and the length of the resulting array is 5."
          },
          {
            caseNumber: 2,
            input: ["nums", "[0,0,1,1,1,1,2,3,3]"],
            output: "7",
            explanation: "After removing duplicates such that each unique element appears at most twice, nums becomes [0,0,1,1,2,3,3] and the length of the resulting array is 7."
          },
          {
            caseNumber: 3,
            input: ["nums", "[1,1,1,1,2,2,3,3,3,3]"],
            output: "8",
            explanation: "After removing duplicates such that each unique element appears at most twice, nums becomes [1,1,2,2,3,3] and the length of the resulting array is 8."
          }
        ],
        templateCode: {
          Python: "from typing import List\n\ndef removeDuplicates(nums: List[int]) -> int:\n    # Code goes here",
          Java: "public class Solution {\n    public int removeDuplicates(int[] nums) {\n        // Code goes here\n    }\n}",
          Cpp: "class Solution {\n public: \n    int removeDuplicates(vector<int>& nums) {\n        // Code goes here\n    }\n};"
        },
        wrapperCode: {
          Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] nums = {nums};\n        int result = sol.removeDuplicates(nums);\n        System.out.println(result);\n    }\n}",
          Python: "if __name__ == '__main__':\n    nums = {nums}\n    result = removeDuplicates(nums)\n    print(result)",
          Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> nums = {nums};\n    int result = sol.removeDuplicates(nums);\n    cout << result << endl;\n    return 0;\n}"
        }
      },
      
      {
        quesNo: 7,
        title: "Rotate Array",
        description: "Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.",
        constraint: "1 <= nums.length <= 10^5\n-2^31 <= nums[i] <= 2^31 - 1\n0 <= k <= 10^5",
        difficulty: "Medium",
        tag: ["Array", "Two Pointers", "Mathematics"],
        leetcode: "https://leetcode.com/problems/rotate-array/",
        points: 20,
        cases: [
          {
            caseNumber: 1,
            input: ["nums", "[1,2,3,4,5,6,7]", "k", "3"],
            output: "[5,6,7,1,2,3,4]",
            explanation: "After rotating 3 steps to the right, the array becomes [5,6,7,1,2,3,4]."
          },
          {
            caseNumber: 2,
            input: ["nums", "[-1,-100,3,99]", "k", "2"],
            output: "[3,99,-1,-100]",
            explanation: "After rotating 2 steps to the right, the array becomes [3,99,-1,-100]."
          },
          {
            caseNumber: 3,
            input: ["nums", "[1,2]", "k", "3"],
            output: "[2,1]",
            explanation: "Since k = 3 is equivalent to k = 1 for length 2, after rotating 1 step to the right, the array becomes [2,1]."
          }
        ],
        templateCode: {
          Python: "from typing import List\n\ndef rotate(nums: List[int], k: int) -> None:\n    # Code goes here",
          Java: "public class Solution {\n    public void rotate(int[] nums, int k) {\n        // Code goes here\n    }\n}",
          Cpp: "class Solution {\n public: \n    void rotate(vector<int>& nums, int k) {\n        // Code goes here\n    }\n};"
        },
        wrapperCode: {
          Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] nums = {nums};\n        int k = {k};\n        sol.rotate(nums, k);\n        System.out.println(Arrays.toString(nums));\n    }\n}",
          Python: "if __name__ == '__main__':\n    nums = {nums}\n    k = {k}\n    rotate(nums, k)\n    print(nums)",
          Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> nums = {nums};\n    int k = {k};\n    sol.rotate(nums, k);\n    for (int num : nums) {\n        cout << num << \" \";\n    }\n    cout << endl;\n    return 0;\n}"
        }
      },
      {
        quesNo: 9,
        title: "Best Time to Buy and Sell Stock II",
        description: "You are given an integer array prices where prices[i] is the price of a given stock on the ith day.\nOn each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. However, you can buy it again immediately after you sell it.\nReturn the maximum profit you can achieve.",
        constraint: "1 <= prices.length <= 3 * 10^4\n0 <= prices[i] <= 10^4",
        difficulty: "Medium",
        tag: ["Array", "Greedy", "Dynamic Programming"],
        leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/",
        points: 20,
        cases: [
          {
            caseNumber: 1,
            input: ["prices", "[7,1,5,3,6,4]"],
            output: "7"
          },
          {
            caseNumber: 2,
            input: ["prices", "[1,2,3,4,5]"],
            output: "4"
          },
          {
            caseNumber: 3,
            input: ["prices", "[7,6,4,3,1]"],
            output: "0"
          }
        ],
        templateCode: {
          Python: "from typing import List\ndef maxProfit(prices: List[int]) -> int:\n    ",
          Java: "public class Solution {\n    public int maxProfit(int[] prices) {\n        return 0;\n    }\n}",
          Cpp: "class Solution {\n public:\n    int maxProfit(vector<int>& prices) {\n        return 0;\n    }\n};"
        },
        wrapperCode: {
          Java: "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] prices = {prices};\n        int result = sol.maxProfit(prices);\n        System.out.println(result);\n    }\n}",
          Python: "if __name__ == \"__main__\":\n    prices = {prices}\n    print(maxProfit(prices))",
          Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    Solution sol;\n    vector<int> prices = {prices};\n    int result = sol.maxProfit(prices);\n    cout << result << endl;\n    return 0;\n}"
        }
      },
      {
        quesNo: 10,
        title: "Majority Element II",
        description: "Given an integer array of size n, find all elements that appear more than ⌊ n/3 ⌋ times in the array. The algorithm should run in O(n) time complexity and use O(1) space.",
        constraint: "1 <= nums.length <= 5 * 10^4 \n -10^9 <= nums[i] <= 10^9",
        difficulty: "Medium",
        tag: ["Array", "HashMap", "Boyer-Moore Voting Algorithm"],
        leetcode: "https://leetcode.com/problems/majority-element-ii/",
        points: 20,
        cases: [
          {
            caseNumber: 1,
            input: ["nums", "[3,2,3]"],
            output: "[3]",
            explanation: "The majority element that appears more than n/3 times is 3."
          },
          {
            caseNumber: 2,
            input: ["nums", "[1,1,1,3,3,2,2,2]"],
            output: "[1,2]",
            explanation: "Both 1 and 2 appear more than n/3 times in the array."
          },
          {
            caseNumber: 3,
            input: ["nums", "[1]"],
            output: "[1]",
            explanation: "The only element in the array is 1, which appears more than n/3 times."
          }
        ],
        templateCode: {
          Python: "def majorityElement(nums: list[int]) -> list[int]:\n    # Your logic here",
          Java: "public class Solution {\n    public List<Integer> majorityElement(int[] nums) {\n        return new ArrayList<>(); // Your logic here\n    }\n}",
          Cpp: "class Solution {\n public: \n    vector<int> majorityElement(vector<int>& nums) {\n        return {}; // Your logic here\n    } \n};"
        },
        wrapperCode: {
          Java: "public class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] nums = {3, 2, 3};  // Replace with input array\n        System.out.println(sol.majorityElement(nums));\n    }\n}",
          Python: "if __name__ == \"__main__\":\n    nums = {nums} \n    print(majorityElement(nums))",
          Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> nums = {3, 2, 3};  // Replace with input array\n    vector<int> result = sol.majorityElement(nums);\n    for (int num : result) {\n        cout << num << \" \";\n    }\n    cout << endl;\n    return 0;\n}"
        }
      },
      
      {
        quesNo: 11,
        title: "Jump Game",
        description: "Given an array of non-negative integers nums, you are initially positioned at the first index. Each element in the array represents your maximum jump length from that position, and you are trying to reach the last index. Return true if you can reach the last index, otherwise return false.",
        constraint: "1 <= nums.length <= 10000\n0 <= nums[i] <= 10000",
        difficulty: "Medium",
        tag: ["Greedy", "Array"],
        leetcode: "https://leetcode.com/problems/jump-game/description/",
        points: 20,
        cases: [
          {
            caseNumber: 1,
            input: ["nums", "[2,3,1,1,4]"],
            output: "true",
            explanation: "We can jump to the last index by jumping from index 0 to index 1, then from index 1 to the last index."
          },
          {
            caseNumber: 2,
            input: ["nums", "[3,2,1,0,4]"],
            output: "false",
            explanation: "We can't move beyond index 3, and thus cannot reach the last index."
          },
          {
            caseNumber: 3,
            input: ["nums", "[0]"],
            output: "true",
            explanation: "The array has only one element, so we are already at the last index."
          }
        ],
        templateCode: {
          Python: "from typing import List\ndef canJump(nums: List[int]) -> bool:\n    ",
          Java: "public class Solution {\n    public boolean canJump(int[] nums) {\n        return false;\n    }\n}",
          Cpp: "class Solution {\n public: \n    bool canJump(vector<int>& nums) {\n        return false;\n    }\n};"
        },
        wrapperCode: {
          Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] nums = {nums};\n        boolean result = sol.canJump(nums);\n        System.out.println(result);\n    }\n}",
          Python: "if __name__ == \"__main__\":\n    nums = {nums}\n    print(canJump(nums))",
          Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> nums = {nums};\n    bool result = sol.canJump(nums);\n    cout << result << endl;\n    return 0;\n}"
        }
      },
      {
        quesNo: 12,
        title: "Jump Game II",
        description: "Given an array of non-negative integers nums, you are initially positioned at the first index. Each element in the array represents your maximum jump length from that position. Your goal is to reach the last index with the minimum number of jumps. Return the minimum number of jumps required to reach the last index.",
        constraint: "1 <= nums.length <= 10000\n0 <= nums[i] <= 10000",
        difficulty: "Medium",
        tag: ["Greedy", "Array", "Dynamic Programming"],
        leetcode: "https://leetcode.com/problems/jump-game-ii/description/",
        points: 20,
        cases: [
          {
            caseNumber: 1,
            input: ["nums", "[2,3,1,1,4]"],
            output: "2",
            explanation: "We can jump to index 1, then from index 1 to index 4 in 2 jumps."
          },
          {
            caseNumber: 2,
            input: ["nums", "[1,2,3,4,5]"],
            output: "3",
            explanation: "We can jump to index 1, then to index 3, then to the last index in 3 jumps."
          },
          {
            caseNumber: 3,
            input: ["nums", "[1,2,1,1,1]"],
            output: "3",
            explanation: "We can jump to index 1, then index 2, and finally the last index in 3 jumps."
          }
        ],
        templateCode: {
          Python: "from typing import List\ndef jump(nums: List[int]) -> int:\n    ",
          Java: "public class Solution {\n    public int jump(int[] nums) {\n        return 0;\n    }\n}",
          Cpp: "class Solution {\n public: \n    int jump(vector<int>& nums) {\n        return 0;\n    }\n};"
        },
        wrapperCode: {
          Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] nums = {nums};\n        int result = sol.jump(nums);\n        System.out.println(result);\n    }\n}",
          Python: "if __name__ == \"__main__\":\n    nums = {nums}\n    print(jump(nums))",
          Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> nums = {nums};\n    int result = sol.jump(nums);\n    cout << result << endl;\n    return 0;\n}"
        }
      },
      {
        quesNo: 13,
        title: "H-Index",
        description: "Given an array of integers citations where citations[i] is the number of citations a researcher received for their ith paper, return the researcher's h-index. According to the definition of h-index on Wikipedia: A researcher has index h if h of their n papers have at least h citations each, and the other n − h papers have no more than h citations each.",
        constraint: "n == citations.length\n1 <= n <= 5000\n0 <= citations[i] <= 1000",
        difficulty: "Medium",
        tag: ["Array", "Sorting", "Greedy"],
        leetcode: "https://leetcode.com/problems/h-index/description/",
        points: 20,
        cases: [
          {
            caseNumber: 1,
            input: ["citations", "[3,0,6,1,5]"],
            output: "3",
            explanation: "The h-index is 3 because the researcher has 3 papers with at least 3 citations each."
          },
          {
            caseNumber: 2,
            input: ["citations", "[1,3,1]"],
            output: "1",
            explanation: "The h-index is 1 because the researcher has 1 paper with at least 1 citation."
          },
          {
            caseNumber: 3,
            input: ["citations", "[10,8,5,4,3]"],
            output: "4",
            explanation: "The h-index is 4 because the researcher has 4 papers with at least 4 citations each."
          }
        ],
        templateCode: {
          Python: "from typing import List\ndef hIndex(citations: List[int]) -> int:\n    ",
          Java: "public class Solution {\n    public int hIndex(int[] citations) {\n        return 0;\n    }\n}",
          Cpp: "class Solution {\n public: \n    int hIndex(vector<int>& citations) {\n        return 0;\n    }\n};"
        },
        wrapperCode: {
          Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] citations = {citations};\n        int result = sol.hIndex(citations);\n        System.out.println(result);\n    }\n}",
          Python: "if __name__ == \"__main__\":\n    citations = {citations}\n    print(hIndex(citations))",
          Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> citations = {citations};\n    int result = sol.hIndex(citations);\n    cout << result << endl;\n    return 0;\n}"
        }
      },
      {
        quesNo: 14,
        title: "Insert Delete GetRandom O(1)",
        description: "Design a data structure that supports the following operations: insert, delete, and getRandom. The insert operation adds an item to the collection if not already present. The delete operation removes an item from the collection if present. The getRandom operation returns a random element from the current collection of elements. Each of the insert, delete, and getRandom operations should be done in O(1) average time complexity.",
        constraint: "1 <= val <= 10^5\nAll operations are done on a non-empty collection.",
        difficulty: "Medium",
        tag: ["Design", "Hash Set", "Randomized"],
        leetcode: "https://leetcode.com/problems/insert-delete-getrandom-o1/description/",
        points: 20,
        cases: [
          {
            caseNumber: 1,
            input: ["operations", "[\"insert\", \"insert\", \"getRandom\", \"insert\", \"getRandom\", \"delete\", \"getRandom\"]"],
            output: "[null, null, 1, null, 2, null, 1]",
            explanation: "Insert 1, insert 2, getRandom (either 1 or 2), insert 3, getRandom (either 1, 2, or 3), delete 1, getRandom (either 2 or 3)."
          },
          {
            caseNumber: 2,
            input: ["operations", "[\"insert\", \"insert\", \"delete\", \"getRandom\"]"],
            output: "[null, null, null, 2]",
            explanation: "Insert 2, insert 3, delete 2, getRandom (only 3 remains)."
          }
        ],
        templateCode: {
          Python: "import random\nclass RandomizedSet:\n    def __init__(self):\n        self.data = {}\n        self.values = []\n\n    def insert(self, val: int) -> bool:\n        # Implement insert here\n        pass\n\n    def remove(self, val: int) -> bool:\n        # Implement remove here\n        pass\n\n    def getRandom(self) -> int:\n        # Implement getRandom here\n        pass",
          Java: "import java.util.*;\npublic class RandomizedSet {\n\n    private Map<Integer, Integer> map;\n    private List<Integer> list;\n\n    public RandomizedSet() {\n        map = new HashMap<>();\n        list = new ArrayList<>();\n    }\n\n    public boolean insert(int val) {\n        // Implement insert here\n        return false;\n    }\n\n    public boolean remove(int val) {\n        // Implement remove here\n        return false;\n    }\n\n    public int getRandom() {\n        // Implement getRandom here\n        return 0;\n    }\n}",
          Cpp: "#include <iostream>\n#include <unordered_map>\n#include <vector>\nusing namespace std;\n\nclass RandomizedSet {\npublic:\n    unordered_map<int, int> map;\n    vector<int> values;\n\n    RandomizedSet() {}\n\n    bool insert(int val) {\n        // Implement insert here\n        return false;\n    }\n\n    bool remove(int val) {\n        // Implement remove here\n        return false;\n    }\n\n    int getRandom() {\n        // Implement getRandom here\n        return 0;\n    }\n};"
        },
        wrapperCode: {
          Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        RandomizedSet obj = new RandomizedSet();\n        System.out.println(obj.insert(1));\n        System.out.println(obj.getRandom());\n        System.out.println(obj.insert(2));\n        System.out.println(obj.getRandom());\n    }\n}",
          Python: "if __name__ == \"__main__\":\n    obj = RandomizedSet()\n    print(obj.insert(1))\n    print(obj.getRandom())\n    print(obj.insert(2))\n    print(obj.getRandom())",
          Cpp: "#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n    RandomizedSet obj;\n    cout << obj.insert(1) << endl;\n    cout << obj.getRandom() << endl;\n    cout << obj.insert(2) << endl;\n    cout << obj.getRandom() << endl;\n}"
        }
      },
      {
        quesNo: 15,
        title: "Product of Array Except Self",
        description: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. You must solve it without using division and in O(n) time complexity.",
        constraint: "2 <= nums.length <= 10^5 \n -30 <= nums[i] <= 30 \n The answer is guaranteed to fit in a 32-bit integer.",
        difficulty: "Medium",
        tag: ["Array", "Prefix Sum", "Product", "Two-Pass Algorithm"],
        leetcode: "https://leetcode.com/problems/product-of-array-except-self/",
        points: 20,
        cases: [
          {
            caseNumber: 1,
            input: ["nums", "[1, 2, 3, 4]"],
            output: "[24, 12, 8, 6]",
            explanation: "The product of the elements except the current one for each index."
          },
          {
            caseNumber: 2,
            input: ["nums", "[-1, 1, 0, -3, 3]"],
            output: "[0, 0, 9, 0, 0]"
          },
          {
            caseNumber: 3,
            input: ["nums", "[1, 1]"],
            output: "[1, 1]"
          }
        ],
        templateCode: {
          Python: "from typing import List \ndef product_except_self(nums: List[int]) -> List[int]:\n    # Your logic here",
          Java: "public class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        return new int[]{};  // Your logic here\n    }\n}",
          Cpp: "class Solution {\n public: \n    vector<int> productExceptSelf(vector<int>& nums) {\n        return {}; // Your logic here\n    } \n};"
        },
        wrapperCode: {
          Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] nums = {nums};  // Replace with input array\n        int[] result = sol.productExceptSelf(nums);\n        System.out.print(\"[\");\n        for (int i = 0; i < result.length; i++) {\n            System.out.print(result[i]);\n            if (i < result.length - 1) {\n                System.out.print(\",\");\n            }\n        }\n        System.out.println(\"]\");\n    }\n}",
          Python: "if __name__ == \"__main__\":\n    nums = {nums} \n    print(product_except_self(nums))",
          Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> nums = {nums};  // Replace with input array\n    vector<int> result = sol.productExceptSelf(nums);\n    cout << \"[\";\n    for (size_t i = 0; i < result.size(); i++) {\n        cout << result[i];\n        if (i != result.size() - 1) cout << \",\";\n    }\n    cout << \"]\" << endl;\n    return 0;\n}"
        }
      },
      {
        quesNo: 16,
        title: "Gas Station",
        description: "There are N gas stations along a circular route, where the distance between each pair of adjacent stations is given. You are given two integer arrays `gas` and `cost` of length N, where `gas[i]` is the amount of gas that station i provides and `cost[i]` is the cost to travel from station i to station i+1. You need to return the starting gas station index where the car can travel around the circuit once without running out of gas. If there is no solution, return -1.",
        constraint: "1 <= gas.length <= 10^4 \n 0 <= gas[i] <= 10^4 \n 0 <= cost[i] <= 10^4",
        difficulty: "Medium",
        tag: ["Greedy", "Array", "Simulation"],
        leetcode: "https://leetcode.com/problems/gas-station/",
        points: 20,
        cases: [
          {
            caseNumber: 1,
            input: ["gas", "[1, 2, 3, 4, 5]", "cost", "[3, 4, 5, 1, 2]"],
            output: "3",
            explanation: "Starting from index 3, the car can travel around the circuit without running out of gas."
          },
          {
            caseNumber: 2,
            input: ["gas", "[2, 3, 4]", "cost", "[3, 4, 3]"],
            output: "-1",
            explanation: "There is no solution, as the car cannot complete the circuit."
          },
          {
            caseNumber: 3,
            input: ["gas", "[5, 8, 3, 4]", "cost", "[4, 4, 4, 5]"],
            output: "1",
            explanation: "Starting from index 1, the car can complete the circuit without running out of gas."
          }
        ],
        templateCode: {
          Python: "from typing import List\n\ndef canCompleteCircuit(gas: List[int], cost: List[int]) -> int:\n    # Your logic here",
          Java: "public class Solution {\n    public int canCompleteCircuit(int[] gas, int[] cost) {\n        return -1;  // Your logic here\n    }\n}",
          Cpp: "class Solution {\n public: \n    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {\n        return -1; // Your logic here\n    } \n};"
        },
        wrapperCode: {
          Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] gas = {gas};  // Replace with input array\n        int[] cost = {cost};  // Replace with input array\n        int result = sol.canCompleteCircuit(gas, cost);\n        System.out.println(result);\n    }\n}",
          Python: "if __name__ == \"__main__\":\n    gas = {gas}   \n    cost = {cost}  \n    print(canCompleteCircuit(gas, cost))",
          Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> gas = {gas};  // Replace with input array\n    vector<int> cost = {cost};  // Replace with input array\n    int result = sol.canCompleteCircuit(gas, cost);\n    cout << result << endl;\n    return 0;\n}"
        }
      },
      
    ],
    Hard : [
      {
        quesNo: 17,
        title: "Candy",
        description: "There are N children standing in a line. Each child has a rating value given in the integer array `ratings`. You are giving candies to these children subjected to the following requirements:\n\n1. Each child must have at least one candy.\n2. Children with a higher rating get more candies than their neighbors.\n\nReturn the minimum number of candies you need to distribute to the children.",
        constraint: "1 <= ratings.length <= 2 * 10^4 \n 0 <= ratings[i] <= 2^31 - 1",
        difficulty: "Hard",
        tag: ["Greedy", "Array"],
        leetcode: "https://leetcode.com/problems/candy/",
        points: 40,
        cases: [
          {
            caseNumber: 1,
            input: ["ratings", "[1, 0, 2]"],
            output: "5",
            explanation: "Child 1 gets 2 candies, child 2 gets 1 candy, and child 3 gets 2 candies. Total = 5."
          },
          {
            caseNumber: 2,
            input: ["ratings", "[1, 2, 2]"],
            output: "4",
            explanation: "Child 1 gets 1 candy, child 2 gets 2 candies, and child 3 gets 1 candy. Total = 4."
          },
          {
            caseNumber: 3,
            input: ["ratings", "[3, 3, 3, 3, 3]"],
            output: "5",
            explanation: "Each child gets 1 candy initially. No one gets more candies as their rating is the same."
          }
        ],
        templateCode: {
          Python: "from typing import List\n\ndef candy(ratings: List[int]) -> int:\n    # Your logic here",
          Java: "public class Solution {\n    public int candy(int[] ratings) {\n        return 0;  // Your logic here\n    }\n}",
          Cpp: "class Solution {\n public: \n    int candy(vector<int>& ratings) {\n        return 0; // Your logic here\n    } \n};"
        },
        wrapperCode: {
          Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] ratings = {ratings};  // Replace with input array\n        int result = sol.candy(ratings);\n        System.out.println(result);\n    }\n}",
          Python: "if __name__ == \"__main__\":\n    ratings = {ratings}  # Replace with input array\n    print(candy(ratings))",
          Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> ratings = {ratings};  // Replace with input array\n    int result = sol.candy(ratings);\n    cout << result << endl;\n    return 0;\n}"
        }
      },
      {
        quesNo: 18,
        title: "Trapping Rain Water",
        description: "Given n non-negative integers representing the height of each bar in a histogram, where the width of each bar is 1, compute how much water it can trap after raining.",
        constraint: "1 <= height.length <= 2 * 10^4 \n 0 <= height[i] <= 10^5",
        difficulty: "Hard",
        tag: ["Array", "Dynamic Programming", "Two Pointers", "Stack"],
        leetcode: "https://leetcode.com/problems/trapping-rain-water/",
        points: 40,
        cases: [
          {
            caseNumber: 1,
            input: ["height", "[0,1,0,2,1,0,1,3,2,1,2,1]"],
            output: "6",
            explanation: "The total trapped water is 6 units."
          },
          {
            caseNumber: 2,
            input: ["height", "[4,2,0,3,2,5]"],
            output: "9",
            explanation: "The total trapped water is 9 units."
          },
          {
            caseNumber: 3,
            input: ["height", "[1,2,1,2,1,2,1]"],
            output: "3",
            explanation: "The total trapped water is 3 units."
          }
        ],
        templateCode: {
          Python: "from typing import List\n\ndef trap(height: List[int]) -> int:\n    # Your logic here",
          Java: "public class Solution {\n    public int trap(int[] height) {\n        return 0;  // Your logic here\n    }\n}",
          Cpp: "class Solution {\n public: \n    int trap(vector<int>& height) {\n        return 0; // Your logic here\n    } \n};"
        },
        wrapperCode: {
          Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] height = {height};  // Replace with input array\n        int result = sol.trap(height);\n        System.out.println(result);\n    }\n}",
          Python: "if __name__ == \"__main__\":\n    height = {height}  # Replace with input array\n    print(trap(height))",
          Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> height = {height};  // Replace with input array\n    int result = sol.trap(height);\n    cout << result << endl;\n    return 0;\n}"
        }
      } 
    ]
   },
  },
  {
    topic : "Strings",
    level : {
      Easy : [
        {
          quesNo: 19,
          title: "Roman to Integer",
          description: "Given a roman numeral, convert it to an integer. The Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M. For example, 2 is written as II in Roman numeral, just two ones added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.",
          constraint: "1 <= s.length <= 15 \n s consists of the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').",
          difficulty: "Easy",
          tag: ["String"],
          leetcode: "https://leetcode.com/problems/roman-to-integer/",
          points: 10,
          cases: [
            {
              caseNumber: 1,
              input: ["s", "\"III\""],
              output: "3",
              explanation: "Roman numeral III is equal to 3."
            },
            {
              caseNumber: 2,
              input: ["s", "\"LVIII\""],
              output: "58",
              explanation: "Roman numeral LVIII is equal to 58."
            },
            {
              caseNumber: 3,
              input: ["s", "\"MCMXCIV\""],
              output: "1994",
              explanation: "Roman numeral MCMXCIV is equal to 1994."
            }
          ],
          templateCode: {
            Python: "def romanToInt(s: str) -> int:\n    # Your logic here",
            Java: "public class Solution {\n    public int romanToInt(String s) {\n        return 0;  // Your logic here\n    }\n}",
            Cpp: "class Solution {\n public: \n    int romanToInt(string s) {\n        return 0; // Your logic here\n    } \n};"
          },
          wrapperCode: {
            Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        String s = \"{s}\"; \n        int result = sol.romanToInt(s);\n        System.out.println(result);\n    }\n}",
            Python: "if __name__ == \"__main__\":\n    s = \"{s}\"  \n    print(romanToInt(s))",
            Cpp: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    string s = \"{s}\"; \n    int result = sol.romanToInt(s);\n    cout << result << endl;\n    return 0;\n}"
          }
        },
        {
          quesNo: 21,
          title: "Length of Last Word",
          description: "Given a string s consisting of words and spaces, return the length of the last word in the string. A word is a maximal substring consisting of non-space characters only.",
          constraint: "1 <= s.length <= 10^4 \n s consists of only English letters and spaces.",
          difficulty: "Easy",
          tag: ["String"],
          leetcode: "https://leetcode.com/problems/length-of-last-word/",
          points: 10,
          cases: [
            {
              caseNumber: 1,
              input: ["s", "\"Hello World\""],
              output: "5",
              explanation: "The last word is 'World' and its length is 5."
            },
            {
              caseNumber: 2,
              input: ["s", "\"   fly me   to   the moon  \""],
              output: "4",
              explanation: "The last word is 'moon' and its length is 4."
            },
            {
              caseNumber: 3,
              input: ["s", "\"luffy is still joyboy\""],
              output: "6",
              explanation: "The last word is 'joyboy' and its length is 6."
            }
          ],
          templateCode: {
            Python: "def lengthOfLastWord(s: str) -> int:\n    # Your logic here",
            Java: "public class Solution {\n    public int lengthOfLastWord(String s) {\n        return 0;  // Your logic here\n    }\n}",
            Cpp: "class Solution {\n public: \n    int lengthOfLastWord(string s) {\n        return 0; // Your logic here\n    } \n};"
          },
          wrapperCode: {
            Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        String s = \"{s}\";  \n        int result = sol.lengthOfLastWord(s);\n        System.out.println(result);\n    }\n}",
            Python: "if __name__ == \"__main__\":\n    s = \"{s}\" \n    print(lengthOfLastWord(s))",
            Cpp: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    string s = \"{s}\";  \n    int result = sol.lengthOfLastWord(s);\n    cout << result << endl;\n    return 0;\n}"
          }
        },
        
      {
        quesNo: 23,
        title: "Zigzag Conversion",
        description: "The string 'PAYPALISHIRING' is written in a zigzag pattern on a given number of rows. You need to write a function that takes a string and a number of rows and returns the string written in zigzag format. Once you have the zigzag pattern, read it line by line to return the result.",
        constraint: "1 <= s.length <= 1000 \n 1 <= numRows <= 1000",
        difficulty: "Medium",
        tag: ["String"],
        leetcode: "https://leetcode.com/problems/zigzag-conversion/",
        points: 20,
        cases: [
          {
            caseNumber: 1,
            input: ["s", "\"PAYPALISHIRING\"","numRows", "3"],
            output: "\"PAHNAPLSIIGYIR\"",
            explanation: "The string is written in a zigzag pattern on 3 rows, and when read left to right, the result is 'PAHNAPLSIIGYIR'."
          },
          {
            caseNumber: 2,
            input: ["s", "\"PAYPALISHIRING\"","numRows", "4"],
            output: "\"PINALSIGYAHRPI\"",
            explanation: "The string is written in a zigzag pattern on 4 rows, and when read left to right, the result is 'PINALSIGYAHRPI'."
          },
          {
            caseNumber: 3,
            input: ["s", "\"A\"","numRows", "1"],
            output: "\"A\"",
            explanation: "With only one row, the zigzag pattern is simply the original string."
          }
        ],
        templateCode: {
          Python: "def convert(s: str, numRows: int) -> str:\n    # Your logic here",
          Java: "public class Solution {\n    public String convert(String s, int numRows) {\n        return \"\";  // Your logic here\n    }\n}",
          Cpp: "class Solution {\n public: \n    string convert(string s, int numRows) {\n        return \"\"; // Your logic here\n    } \n};"
        },
        wrapperCode: {
          Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        String s = \"{s}\"; \n        int numRows = {numRows};  \n        String result = sol.convert(s, numRows);\n        System.out.println(result);\n    }\n}",
          Python: "if __name__ == \"__main__\":\n    s = \"{s}\" \n    numRows = {numRows}  \n    print(convert(s, numRows))",
          Cpp: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    string s = \"{s}\"; \n    int numRows = {numRows};  \n    string result = sol.convert(s, numRows);\n    cout << result << endl;\n    return 0;\n}"
        }
      },
      {
        quesNo: 24,
        title: "Find the Index of the First Occurrence in a String",
        description: "Given two strings 'needle' and 'haystack', return the index of the first occurrence of 'needle' in 'haystack', or -1 if 'needle' is not part of 'haystack'.",
        constraint: "1 <= haystack.length, needle.length <= 10^4 \n haystack and needle consist of only lowercase English characters.",
        difficulty: "Easy",
        tag: ["String"],
        leetcode: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/",
        points: 10,
        cases: [
          {
            caseNumber: 1,
            input: ["haystack", "\"sadbutsad\"", "needle", "\"sad\""],
            output: "0",
            explanation: "The string 'sad' occurs at index 0 and 6. The first occurrence is at index 0, so we return 0."
          },
          {
            caseNumber: 2,
            input: ["haystack", "\"leetcode\"", "needle", "\"leeto\""],
            output: "-1",
            explanation: "'leeto' did not occur in 'leetcode', so we return -1."
          },
          {
            caseNumber: 3,
            input: ["haystack", "\"aaaaa\"", "needle", "\"bba\""],
            output: "-1",
            explanation: "'bba' is not found in 'aaaaa', so we return -1."
          }
        ],
        templateCode: {
          Python: "def strStr(haystack: str, needle: str) -> int:\n    # Your logic here",
          Java: "public class Solution {\n    public int strStr(String haystack, String needle) {\n        return -1;  // Your logic here\n    }\n}",
          Cpp: "class Solution {\n public: \n    int strStr(string haystack, string needle) {\n        return -1; // Your logic here\n    } \n};"
        },
        wrapperCode: {
          Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        String haystack = \"{haystack}\";  \n        String needle = \"{needle}\";  \n        int result = sol.strStr(haystack, needle);\n        System.out.println(result);\n    }\n}",
          Python: "if __name__ == \"__main__\":\n    haystack = \"{haystack}\"  \n    needle = \"{needle}\"  \n    print(strStr(haystack, needle))",
          Cpp: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    string haystack = \"{haystack}\";  \n    string needle = \"{needle}\";  \n    int result = sol.strStr(haystack, needle);\n    cout << result << endl;\n    return 0;\n}"
        }

      },
  
  
      ],
      Medium : [
        {
          quesNo: 20,
          title: "Integer to Roman",
          description: "Given an integer, convert it to a roman numeral. You may assume the integer is within the range from 1 to 3999.",
          constraint: "1 <= num <= 3999",
          difficulty: "Medium",
          tag: ["Math", "String"],
          leetcode: "https://leetcode.com/problems/integer-to-roman/",
          points: 20,
          cases: [
            {
              caseNumber: 1,
              input: ["num", "3"],
              output: "\"III\"",
              explanation: "The integer 3 is written as III in Roman numeral."
            },
            {
              caseNumber: 2,
              input: ["num", "58"],
              output: "\"LVIII\"",
              explanation: "The integer 58 is written as LVIII in Roman numeral."
            },
            {
              caseNumber: 3,
              input: ["num", "1994"],
              output: "\"MCMXCIV\"",
              explanation: "The integer 1994 is written as MCMXCIV in Roman numeral."
            }
          ],
          templateCode: {
            Python: "def intToRoman(num: int) -> str:\n    # Your logic here",
            Java: "public class Solution {\n    public String intToRoman(int num) {\n        return \"\";  // Your logic here\n    }\n}",
            Cpp: "class Solution {\n public: \n    string intToRoman(int num) {\n        return \"\"; // Your logic here\n    } \n};"
          },
          wrapperCode: {
            Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int num = {num};  \n        String result = sol.intToRoman(num);\n        System.out.println(result);\n    }\n}",
            Python: "if __name__ == \"__main__\":\n    num = {num} \n    print(intToRoman(num))",
            Cpp: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    int num = {num};  \n    string result = sol.intToRoman(num);\n    cout << result << endl;\n    return 0;\n}"
          }
        },
        {
          quesNo: 22,
          title: "Reverse Words in a String",
          description: "Given an input string s, reverse the order of the words. A word is defined as a sequence of non-space characters. The words in s will be separated by at least one space. Return a string of the words in reverse order concatenated by a single space. Note that s may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.",
          constraint: "1 <= s.length <= 10^4 \n s contains English letters (upper-case and lower-case), digits, and spaces ' '.\n There is at least one word in s.",
          difficulty: "Medium",
          tag: ["String"],
          leetcode: "https://leetcode.com/problems/reverse-words-in-a-string/",
          points: 20,
          cases: [
            {
              caseNumber: 1,
              input: ["s", "\"the sky is blue\""],
              output: "\"blue is sky the\"",
              explanation: "The words in the input string are reversed."
            },
            {
              caseNumber: 2,
              input: ["s", "\"  hello world  \""],
              output: "\"world hello\"",
              explanation: "The input contains leading and trailing spaces, which are removed in the output."
            },
            {
              caseNumber: 3,
              input: ["s", "\"a good   example\""],
              output: "\"example good a\"",
              explanation: "Multiple spaces between words are reduced to a single space in the reversed string."
            }
          ],
          templateCode: {
            Python: "def reverseWords(s: str) -> str:\n    # Your logic here",
            Java: "public class Solution {\n    public String reverseWords(String s) {\n        return \"\";  // Your logic here\n    }\n}",
            Cpp: "class Solution {\n public: \n    string reverseWords(string s) {\n        return \"\"; // Your logic here\n    } \n};"
          },
          wrapperCode: {
            Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        String s = \"{s}\";  \n        String result = sol.reverseWords(s);\n        System.out.println(result);\n    }\n}",
            Python: "if __name__ == \"__main__\":\n    s = \"{s}\" \n    print(reverseWords(s))",
            Cpp: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    string s = \"{s}\";  \n    string result = sol.reverseWords(s);\n    cout << result << endl;\n    return 0;\n}"
          }
        },
  
  
  
      ],
      Hard : [
        {
          quesNo: 25,
          title: "Text Justification",
          description: "Given an array of strings 'words' and a width 'maxWidth', format the text such that each line has exactly maxWidth characters and is fully (left and right) justified. Pack the words in a greedy approach, and pad extra spaces ' ' when necessary. Extra spaces between words should be distributed as evenly as possible, with more spaces given to the left slots if uneven. For the last line, it should be left-justified with no extra space between words.",
          constraint: "1 <= words.length <= 300 \n 1 <= words[i].length <= 20 \n 1 <= maxWidth <= 100",
          difficulty: "Hard",
          tag: ["String", "Greedy"],
          leetcode: "https://leetcode.com/problems/text-justification/",
          points: 40,
          cases: [
            {
              caseNumber: 1,
              input: ["words", "[\"This\", \"is\", \"an\", \"example\", \"of\", \"text\", \"justification.\"]", "maxWidth", "16"],
              output: "[\"This    is    an\", \"example  of text\", \"justification.  \"]",
              explanation: "The words are arranged to make lines with 16 characters, and spaces are distributed evenly between words. The last line is left-justified."
            },
            {
              caseNumber: 2,
              input: ["words", "[\"What\",\"must\",\"be\",\"acknowledgment\",\"shall\",\"be\"]", "maxWidth", "16"],
              output: "[\"What   must   be\", \"acknowledgment  \", \"shall be        \"]",
              explanation: "The first line is fully justified with 16 characters, and the last line is left-justified."
            },
            {
              caseNumber: 3,
              input: ["words", "[\"Science\",\"is\",\"what\",\"we\",\"understand\",\"well\",\"enough\",\"to\",\"explain\",\"to\",\"a\",\"computer.\",\"Art\",\"is\",\"everything\",\"else\",\"we\",\"do\"]", "maxWidth", "20"],
              output: "[\"Science  is  what we\", \"understand      well\", \"enough to explain to\", \"a  computer.  Art is\", \"everything  else  we\", \"do                  \"]",
              explanation: "The words are formatted to create lines with 20 characters, and spaces are evenly distributed. The last line is left-justified."
            }
          ],
          templateCode: {
            Python: "def fullJustify(words: list, maxWidth: int) -> list:\n    # Your logic here",
            Java: "public class Solution {\n    public List<String> fullJustify(List<String> words, int maxWidth) {\n        return new ArrayList<>();  // Your logic here\n    }\n}",
            Cpp: "class Solution {\n public: \n    vector<string> fullJustify(vector<string>& words, int maxWidth) {\n        return {}; // Your logic here\n    } \n};"
          },
          wrapperCode: {
            Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        List<String> words = Arrays.asList({words});  \n        int maxWidth = {maxWidth};  \n        List<String> result = sol.fullJustify(words, maxWidth);\n        for(String line : result) {\n            System.out.println(line);\n        }\n    }\n}",
            Python: "if __name__ == \"__main__\":\n    words = {words}  # Replace with input words\n    maxWidth = {maxWidth}  # Replace with input maxWidth\n    print(fullJustify(words, maxWidth))",
            Cpp: "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<string> words = {words};  \n    int maxWidth = {maxWidth};  \n    vector<string> result = sol.fullJustify(words, maxWidth);\n    for (string line : result) {\n        cout << line << endl;\n    }\n    return 0;\n}"
          }
        }
      ]
    },
  },
  {
    topic : "Two Pointers",
    level : {
      Easy : [
        {
          quesNo: 26,
          title: "Valid Palindrome",
          description: "Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases. A palindrome is a word, phrase, number, or other sequence of characters that reads the same forward and backward.",
          constraint: "1 <= s.length <= 2 * 10^5 \n s consists only of printable ASCII characters.",
          difficulty: "Easy",
          tag: ["String", "Two Pointers"],
          leetcode: "https://leetcode.com/problems/valid-palindrome/",
          points: 10,
          cases: [
            {
              caseNumber: 1,
              input: ["s", "\"A man, a plan, a canal: Panama\""],
              output: "true",
              explanation: "Ignoring non-alphanumeric characters and case, the string reads the same forward and backward."
            },
            {
              caseNumber: 2,
              input: ["s", "\"race a car\""],
              output: "false",
              explanation: "After ignoring non-alphanumeric characters, the string does not read the same forward and backward."
            },
            {
              caseNumber: 3,
              input: ["s", "\" \""],
              output: "true",
              explanation: "An empty string is considered a valid palindrome."
            }
          ],
          templateCode: {
            Python: "def isPalindrome(s: str) -> bool:\n    # Your logic here",
            Java: "public class Solution {\n    public boolean isPalindrome(String s) {\n        return false; // Your logic here\n    }\n}",
            Cpp: "class Solution {\n public: \n    bool isPalindrome(string s) {\n        return false; // Your logic here\n    } \n};"
          },
          wrapperCode: {
            Java: "public class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        String s = \"{s}\";  \n        System.out.println(sol.isPalindrome(s));\n    }\n}",
            Python: "if __name__ == \"__main__\":\n    s = \"{s}\"  # Replace with input string\n    print(isPalindrome(s))",
            Cpp: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    string s = \"{s}\";  \n    cout << sol.isPalindrome(s) << endl;\n    return 0;\n}"
          }
        },
        {
          quesNo: 27,
          title: "Is Subsequence",
          description: "Given two strings s and t, return true if s is a subsequence of t, or false otherwise. A subsequence of a string is a new string that is formed from the original string by deleting some (or no) characters without changing the relative order of the remaining characters. (Note that s and t are both non-empty strings)",
          constraint: "1 <= s.length <= t.length <= 100 \n 1 <= s.length, t.length <= 100",
          difficulty: "Easy",
          tag: ["String", "Two Pointers"],
          leetcode: "https://leetcode.com/problems/is-subsequence/",
          points: 10,
          cases: [
            {
              caseNumber: 1,
              input: ["s", "\"abc\"", "t", "\"ahbgdc\""],
              output: "true",
              explanation: "The string 'abc' is a subsequence of 'ahbgdc'."
            },
            {
              caseNumber: 2,
              input: ["s", "\"axc\"", "t", "\"ahbgdc\""],
              output: "false",
              explanation: "The string 'axc' is not a subsequence of 'ahbgdc'."
            },
            {
              caseNumber: 3,
              input: ["s", "\"ace\"", "t", "\"abcde\""],
              output: "true",
              explanation: "The string 'ace' is a subsequence of 'abcde'."
            }
          ],
          templateCode: {
            Python: "def isSubsequence(s: str, t: str) -> bool:\n    # Your logic here",
            Java: "public class Solution {\n    public boolean isSubsequence(String s, String t) {\n        return false; // Your logic here\n    }\n}",
            Cpp: "class Solution {\n public: \n    bool isSubsequence(string s, string t) {\n        return false; // Your logic here\n    } \n};"
          },
          wrapperCode: {
            Java: "public class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        String s = \"{s}\"; \n        String t = \"{t}\";  \n        System.out.println(sol.isSubsequence(s, t));\n    }\n}",
            Python: "if __name__ == \"__main__\":\n    s = \"{s}\"  # Replace with input string s\n    t = \"{t}\"  # Replace with input string t\n    print(isSubsequence(s, t))",
            Cpp: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    string s = \"{s}\"; \n    string t = \"{t}\";  \n    cout << sol.isSubsequence(s, t) << endl;\n    return 0;\n}"
          }
        },
        {
          quesNo: 28,
          title: "Two Sum II - Input Array Is Sorted",
          description: "Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the indices of the two numbers (1-indexed) such that they add up to the target. You may assume that each input would have exactly one solution and you may not use the same element twice.",
          constraint: "2 <= numbers.length <= 3 * 10^4 \n -1000 <= numbers[i] <= 1000 \n numbers is sorted in non-decreasing order \n -1000 <= target <= 1000",
          difficulty: "Easy",
          tag: ["Array", "Two Pointers"],
          leetcode: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
          points: 10,
          cases: [
            {
              caseNumber: 1,
              input: ["numbers", "[2, 7, 11, 15]", "target", "9"],
              output: "[1, 2]",
              explanation: "The numbers at indices 1 and 2 add up to 9, so the answer is [1, 2]."
            },
            {
              caseNumber: 2,
              input: ["numbers", "[2, 3, 4]", "target", "6"],
              output: "[1, 3]",
              explanation: "The numbers at indices 1 and 3 add up to 6, so the answer is [1, 3]."
            },
            {
              caseNumber: 3,
              input: ["numbers", "[1, 2, 3, 4, 5]", "target", "10"],
              output: "[4, 5]",
              explanation: "The numbers at indices 4 and 5 add up to 10, so the answer is [4, 5]."
            }
          ],
          templateCode: {
            Python: "def twoSum(numbers: list[int], target: int) -> list[int]:\n    # Your logic here",
            Java: "public class Solution {\n    public int[] twoSum(int[] numbers, int target) {\n        return new int[] {}; // Your logic here\n    }\n}",
            Cpp: "class Solution {\n public: \n    vector<int> twoSum(vector<int>& numbers, int target) {\n        return {}; // Your logic here\n    } \n};"
          },
          wrapperCode: {
            Java: "public class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] numbers = {numbers};  // Replace with input array\n        int target = {target};  // Replace with target\n        int[] result = sol.twoSum(numbers, target);\n        System.out.print(\"[\");\n        for (int i = 0; i < result.length; i++) {\n            System.out.print(result[i]);\n            if (i < result.length - 1) {\n                System.out.print(\",\");\n            }\n        }\n        System.out.println(\"]\");\n    }\n}",
            Python: "if __name__ == \"__main__\":\n    numbers = {numbers}  # Replace with input array\n    target = {target}  # Replace with target\n    print(twoSum(numbers, target))",
            Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> numbers = {numbers};  // Replace with input array\n    int target = {target};  // Replace with target\n    vector<int> result = sol.twoSum(numbers, target);\n    cout << \"[\";\n    for (size_t i = 0; i < result.size(); i++) {\n        cout << result[i];\n        if (i != result.size() - 1) cout << \",\";\n    }\n    cout << \"]\" << endl;\n    return 0;\n}"
          }
        },
      ],
      Medium : [
       
      {
        quesNo: 29,
        title: "Container With Most Water",
        description: "Given n non-negative integers a1, a2, ..., an, where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of the line are (i, ai) and (i, 0). Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.",
        constraint: "2 <= height.length <= 10^5 \n 0 <= height[i] <= 10^4",
        difficulty: "Medium",
        tag: ["Array", "Two Pointers"],
        leetcode: "https://leetcode.com/problems/container-with-most-water/",
        points: 20,
        cases: [
          {
            caseNumber: 1,
            input: ["height", "[1,8,6,2,5,4,8,3,7]"],
            output: "49",
            explanation: "The maximum water that can be contained is between the lines at index 1 and 8 with a height of 7, resulting in a water amount of 49."
          },
          {
            caseNumber: 2,
            input: ["height", "[1,1]"],
            output: "1",
            explanation: "The only possible container is between the first and second line with a height of 1, so the water amount is 1."
          },
          {
            caseNumber: 3,
            input: ["height", "[4,3,2,1,4]"],
            output: "16",
            explanation: "The maximum water that can be contained is between the lines at index 0 and 4 with a height of 4, resulting in a water amount of 16."
          }
        ],
        templateCode: {
          Python: "def maxArea(height: list[int]) -> int:\n    # Your logic here",
          Java: "public class Solution {\n    public int maxArea(int[] height) {\n        return 0; // Your logic here\n    }\n}",
          Cpp: "class Solution {\n public: \n    int maxArea(vector<int>& height) {\n        return 0; // Your logic here\n    } \n};"
        },
        wrapperCode: {
          Java: "public class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] height = {height};  // Replace with input array\n        System.out.println(sol.maxArea(height));\n    }\n}",
          Python: "if __name__ == \"__main__\":\n    height = {height}  # Replace with input array\n    print(maxArea(height))",
          Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> height = {height};  // Replace with input array\n    cout << sol.maxArea(height) << endl;\n    return 0;\n}"
        }
      },
      {
        quesNo: 30,
        title: "3Sum",
        description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.",
        constraint: "3 <= nums.length <= 3000 \n -10^5 <= nums[i] <= 10^5",
        difficulty: "Medium",
        tag: ["Array", "Two Pointers", "Sorting"],
        leetcode: "https://leetcode.com/problems/3sum/",
        points: 20,
        cases: [
          {
            caseNumber: 1,
            input: ["nums", "[-1,0,1,2,-1,-4]"],
            output: "[[-1,-1,2],[-1,0,1]]",
            explanation: "The two triplets that sum to 0 are [-1,-1,2] and [-1,0,1]."
          },
          {
            caseNumber: 2,
            input: ["nums", "[0,1,1]"],
            output: "[]",
            explanation: "No triplet sums to 0."
          },
          {
            caseNumber: 3,
            input: ["nums", "[0,0,0]"],
            output: "[[0,0,0]]",
            explanation: "There is one triplet [0,0,0] that sums to 0."
          }
        ],
        templateCode: {
          Python: "def threeSum(nums: list[int]) -> list[list[int]]:\n    # Your logic here",
          Java: "public class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        return new ArrayList<>(); // Your logic here\n    }\n}",
          Cpp: "class Solution {\n public: \n    vector<vector<int>> threeSum(vector<int>& nums) {\n        return {}; // Your logic here\n    } \n};"
        },
        wrapperCode: {
          Java: "public class Main {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        int[] nums = {nums};\n        System.out.println(sol.threeSum(nums));\n    }\n}",
          Python: "if __name__ == \"__main__\":\n    nums = {nums}\n    print(threeSum(nums))",
          Cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    Solution sol;\n    vector<int> nums = {nums};\n    vector<vector<int>> result = sol.threeSum(nums);\n    for (auto& triplet : result) {\n        cout << \"[\";\n        for (size_t i = 0; i < triplet.size(); i++) {\n            cout << triplet[i];\n            if (i != triplet.size() - 1) cout << \", \";\n        }\n        cout << \"] \" << endl;\n    }\n    return 0;\n}"
        }
      }
      ],
      Hard : [

      ]
    }
  }
 
]
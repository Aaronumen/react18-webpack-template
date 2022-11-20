// 示例 1:

// 输入: nums1 = [1,2,2,1], nums2 = [2,2]
// 输出: [2,2]
// 示例 2:

// 输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
// 输出: [4,9]
// 生成map结构的数据，添加key为数字，值为出现次数的Map结构
function mapCount(arr) {
    let map = new Map();
    for (let i = 0; i < arr.length; i++) {
      let num = arr[i];
    //   判断这个数字出现的次数
      let count = map.get(num);
    //   如果已经存在的数字，count+1，反之设置这个数字，初始值为1
      if (count) {
        map.set(num, count + 1);
      } else {
        map.set(num, 1);
      }
    }
    return map;
  }
  function intersect(arr1, arr2) {
    let map1 = mapCount(arr1),
      map2 = mapCount(arr2),
      res = [];
    //   遍历map结构，num为数字，map1.keys()为Map结构的所有值，即值组成的数组
    for (let num of map1.keys()) {
        // 得出同一个数字在不同数组中出现的次数
      let count1 = map1.get(num),
        count2 = map2.get(num);
        // 只要判断conut2是否存在就知道，是否为交集
      if (count2) {
        // 因为为交集，所以取这个数字出现的最少的次数，然后循环遍历这个次数，放入数组中
        let pushTimes = Math.min(count1, count2);
        for (let i = 0; i < pushTimes; i++) {
          res.push(num);
        }
      }
    }
    return res;
  }
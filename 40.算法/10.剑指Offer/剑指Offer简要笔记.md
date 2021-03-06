[TOC]



我得保证这里面每行代码都是我写的才行😁

本书68个题目

## 小记

- 不会的：
  - 栈
- while和until的区别，cpp没有until，写while注意不要写成“直到”，而要写成“直到之前”
- 
- 

## 第1章 面试的流程

这章没有题目，主要是讲了面试的流程，本章节就一点比较重要：

- 面试要演面试官

但我还想补充，同时你也要面一下面试官，比如：

- 问清楚去了具体做啥，不要面C去了才知道写Go  TAT
- 通过请教面试官深刻的技术问题表达培养潜力（不是）
- 

## 第2章 面试需要的基础知识



#### 面试题 01 赋值运算符函数

有一个含有char数组的字符串对象，写出它的赋值运算符函数。



- 考虑基本情况
  - 入参需为常量
  - 连续赋值语句需要返回引用
  - 被赋值的对象要先释放内存
  - 判断自己给自己赋值
- 考虑异常安全性



#### 面试题 03 数组中重复的数字

##### 题目1

> 长度 `n` ，取值 `[0, n-1]共n个数` 的随机数数组，可能会有一个值多次出现，请找出其中任意一个重复数字。

##### 思路

这道题最简单的解法有两个：排序找重、哈希表找重

1. 不用额外空间O(nlogn) 排序

对数组进行排序，重复的数会连在一起，在扫描看那些连起来了就行。

不需要额外空间，空间复杂度O(1)

排序再扫一遍排序后的数组，时间复杂度O(nlogn)

很简单，不提供代码

2. 解2：使用额外空间O(n) 哈希表

太慢了，如何加速呢？可以用哈希表

用哈希表保存每个数值是否出现或出现几次

哈希表需要另开数组，空间复杂度O(n)

过一遍整个数组，时间复杂度O(n)

很简单，不提供代码



3. 不用额外空间O(n) 原地置换

哈希表真不戳，但浪费了很多存储空间，能不能在保持时间复杂度O(n)的情况下将空间复杂度降低？

可以将原数组就当做哈希表用。

n长的数组取值范围是0-n-1，也就是说如果没有重复数字，排序后，a[I]恰好等于i。那么在我们将数字归位的过程中，如果发现两个相同数字争夺一个位置时，就代表它重复了。



#####  代码

- 从头开始扫描，索引为 `i=[0~n-1]`，扫描到的值为 `a[i]`为x
  - 比较x与i
    - 如果 `x==i`，则 `i++`，继续比较新的x与i
    - 如果`x!=i`，则比较x与a[x]
      - 如果x==a【x】，则这两个数重复了
      - 如果！=，则交换x与ax，重复比较新的x与i

```c++
//代码非常规整，没有需要注意的下标偏移
int findRepeatNumber(vector<int>& nums) {
    for(int i=0;i<n;i++){
        while(nums[i]!=i){//直到等于，即直到数回归本位，一种类似递归的方法
            if(nums[i]==nums[nums[i]]){//本位已经有数等于本位数，则数重复
                return nums[i];
            }
            swap(nums[i],nums[nums[i]]);
        }
    }
    return -1;//返回-1比返回false等更快，再说要是重复的是0怎么办
}
```



##### 题目2

> 长度为 `n+1` ，取值范围 `[1,n]共n个` 的随机数数组，至少有一个重复值，找出重复数字，不修改原数组。
>
> （上一个题是n长度取0~n-1，这个是n+1长度取1~n）长度增加，区间右移一位

##### 思路

`空间复杂度O(n)` 使用额外空间，用哈希表法。

`空间复杂度O(1)` 不适用额外空间又，不允许修改原数组，所以不能用置换法和排序法；需要设计新方法。



`O(1)` 的空间复杂度要求我们不能建立变长数组，所以只能用单个变量来表示次数等含义；一个变量不能分别给[1,n]里的每个数保存出现次数，但是可以保存一个区间内数值出现的次数；所以我们可以对取值范围进行二分查找，即统计`[1,m]`与`[m+1,n]`这两个区间的值在原数组中出现的次数，若某区间内值出现总次数大于区间长度，则区间中必然有值重复出现在原数组；继续二分此区间，直到含有重复数值的区间长度为1。



当然这种方法有可能漏掉某些重复数字，比如[2,2,3,4,5,6,7,7] 8长数组取1-7，[1,4]区间值出现4次，但2却重复出现了两次，因为一个2代替了1的位置，这种现象暂且叫做`借位`。

虽然可能漏掉某些重复数值，但一定能找出一个重复值，因为n+1长取值[1,n]的数组中，必定有个数为了填补n+1的空缺而无法`借位`地重复出现。



##### 代码

```cpp
int findRepeatNumber(vector<int>& nums) {
    int l=1;//统计区间左边界，左闭
    int r=nums.size()-1;//统计区间右边界，右闭
    while(l<=r){//若连[l,r]长度为1时都没有重复的，则报错
		int mid=((r-l)>>1) + l;//mid将整个区间[l,r)分为两半
        int count=countRange(l,r,nums);//统计区间内数值在原数组中的出现次数
        if(count>mid-r)
            ...
    }
    return -1;
}
int countRange(int l,int r,vector<int>& nums)
```



#### 面试题 04	二维数组中的查找

##### 题目

> 一个矩阵，每一行是递增的，每一列也是递增的，给出一个数，找出它在矩阵中的位置。

##### 思路

最简单的是便利，这个还就那个不谈；有序查找一般是二分法，但对于这个矩阵来说，我们要在二维平面上选取中间的一个数，这会将二维平面如下分割：



![1](https://gitee.com/trialley/pics/raw/master/pics/1.png)

可以看到，我们通过比较大小只能排除四象限中的一个，这意味着我们要继续比较剩下的三个象限，当然我们可以将三个象限拼成两个矩形继续比较，但这未免有些麻烦了。



因此我们换一种想法，如果选取角上的数值会如何呢？最大最小值不能选，只能选左下与右上的角。这里以左上角为例：

![2](https://gitee.com/trialley/pics/raw/master/pics/2.png)

设左上角为A，如果选中的A比目标数大，则比A小的数可以舍弃，因此舍弃A所在行，继续对比剩下的矩形；同理，若目标数比A小，则舍弃A所在列。



![3](https://gitee.com/trialley/pics/raw/master/pics/20210224101508.png)

如此选取并排除多次，最终会在某个新选取的右上角A等于目标值。

这种方法可以简称为：选交叉角行列剔除法。



##### 代码

```cpp
class Solution {
public:
    bool findNumberIn2DArray(vector<vector<int>>& matrix, int target) {
        if(matrix.size()==0||matrix[0].size()==0){
            return false;
        }
        int j=matrix[0].size()-1;
        int i=0;
        int n=matrix.size();
        while(i<n && j>=0){//写的时候竟然
            if(matrix[i][j]>target){
                //舍列
                j--;
            }else if(matrix[i][j]<target){
                //舍行
                i++;
            }else{
                return true;
            }
        }
        return false;
    }
};
```



#### 面试题 05	替换空格

##### 题目

> 将一个字符串中所有空格 `" "` 替换为 `"%20"` 。
>
> 1. 可开辟新内存
> 2. 不可开辟新内存，且原字符串空间足够长



##### 思路

若可以开辟新内存，我们只需先便利统计有多少空格，然后开辟足够容纳转义后字符串的新空间，再在拷贝过程中将空格替换为`"%20"`就好了；

若不可以开辟新内存且原字符串空间足够，则先统计空格数目，然后从后往前地复制字符串并替换。

1. 为什么不从前往后位移字符串？因为那样时间复杂度较大，为`O(n^2)`
2. 为什么不从前往后拷贝字符串？因为原始字符串会被提前覆盖

时间复杂度 `O(n)`

空间复杂度 `O(n)`

注意输入字符串是否有内容，注意空间是否充足。

##### 代码

```cpp
class Solution {
public:
    string replaceSpace(string s) {
        int count = 0;
        int len = s.size();
        // 统计空格数量
        for (int i=0;i<len;i++) {
            if (s[i] == ' ') count++;
        }
        // 修改 s 长度
        s.resize(len + 2 * count);//resize传入新长度，原数据依然存在，字符串尾部有结束符。
        // 倒序遍历修改
        int j = len+2*count-1;//下标从0开始
        for(int i = len-1; i>=0; i--, j--) {
            if (s[i] != ' '){
                s[j] = s[i];
            }else{//这样比j--消耗内存少
                s[j - 2] = '%';
                s[j - 1] = '2';
                s[j] = '0';
                j -= 2;
            }
        }
        return s;
    }
};
```



#### 面试题 06	从尾到头打印链表

##### 题目

> 输入链表头，要求逆序打印链表

##### 思路

可以用递归函数，但可能造成调用栈溢出；可以用栈结构保存所有节点，然后从栈顶部再输出。

时间复杂度 `O(n)`；空间复杂度 `O(n)`。

注意链表头为空的情况

##### 代码

太简单，不写。







#### 面试题 07	重建二叉树

##### 题目

>输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
>
>例如，给出
>
>```
>前序遍历 preorder = [3,9,20,15,7]
>中序遍历 inorder = [9,3,15,20,7]
>```
>
>返回如下的二叉树：
>
>        3
>       / \
>      9  20
>        /  \
>       15   7

##### 思路1

> 二叉树的遍历可以出很多题，请到数据结构相关文章去看

题目中提到前序、中序遍历，他们的遍历方式分别是：

前序：

- 根节点
- 左子树
- 右子树

中序：

- 左子树
- 根节点
- 右子树

因此，可以得出遍历输出结果的规律：

````
前序遍历结果：[ 根节点, [左子树的前序遍历结果], [右子树的前序遍历结果] ]
中序遍历结果：[ [左子树的中序遍历结果], 根节点, [右子树的中序遍历结果] ]
````





##### 代码1

```cpp
class Solution {
private:
    unordered_map<int, int> index;

public:
    TreeNode* myBuildTree(
            const vector<int>& preorder, const vector<int>& inorder, 
            int plindex, int prindex, int ilindex, int irindex
        ) {
        if (plindex > prindex) {
            return nullptr;//终止条件
        }
        
        // 前序遍历中的第一个节点就是根节点
        int prootindex = plindex;
        // 在中序遍历中定位根节点
        int irootindex = index[preorder[prootindex]];
        
        // 当前根节点
        TreeNode* root = new TreeNode(preorder[prootindex]);

        // 得到左子树中的节点数目
        int lsize = irootindex - ilindex;
        
        // 递归地构造左子树，并连接到根节点
        // 先序遍历中「从 左边界+1 开始的 lsize」个元素
        // 对应了中序遍历中「从 左边界 开始到 根节点定位-1」的元素
        root->left = myBuildTree(preorder, inorder, plindex + 1, plindex + lsize, ilindex, irootindex - 1);
    
        // 递归地构造右子树，并连接到根节点
        // 先序遍历中「从 左边界+1+左子树节点数目 开始到 右边界」的元素
        // 对应了中序遍历中「从 根节点定位+1 到 右边界」的元素
        root->right = myBuildTree(preorder, inorder, plindex + lsize + 1, prindex, irootindex + 1, irindex);
        return root;
    }

    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        int n = preorder.size();
        // 构造哈希映射，帮助我们快速定位根节点，无需遍历查找中序遍历中根节点位置
        for (int i = 0; i < n; ++i) {
            index[inorder[i]] = i;
        }
        return myBuildTree(preorder, inorder, 0, n - 1, 0, n - 1);
    }
};
```



##### 思路2

除了递归，还可以用for循环来迭代解决，这个就很复杂了，

> 在前序遍历中连续的节点m，n有如下关系
>
> - m有左子树：n是m的左子节点
> - m没有左子树：
>   - m有右子树：n是m的右子节点
>   - m没有右子树：n是m的某祖先节点的右子节点，这个祖先节点怎么确定？

有了这样的认识，我们便可以从前序遍历的第一个节点开始，逐步确认其左右节点。

##### 代码2



```cpp
public TreeNode buildTree(int[] preorder, int[] inorder) {
    if (preorder.length == 0)
        return null;
    Stack<TreeNode> s = new Stack<>();
    //前序的第一个其实就是根节点
    TreeNode root = new TreeNode(preorder[0]);
    TreeNode cur = root;
    for (int i = 1, j = 0; i < preorder.length; i++) {
        if (cur.val != inorder[j]) {//直到最右点
            cur.left = new TreeNode(preorder[i]);
            s.push(cur);
            cur = cur.left;//下一循环构建左子节点
        } else {//如果当前节点没有左子节点，前序的下一值是右子节点
            //前序遍历结果：[ 根节点, [右子树的前序遍历结果] ]
			//中序遍历结果：[ 根节点, [右子树的中序遍历结果] ]
            j++;//上一个判断可知，j是当前节点在中序中的位置，需要加一
            while (!s.empty() && s.peek().val == inorder[j]) {//找到以前序下一节点作为右节点的当前节点的祖父节点
                cur = s.pop();
                j++;
            }
            //给cur添加右节点
            cur = cur.right = new TreeNode(preorder[i]);
        }
    }
    return root;
}
```



#### 面试题 8 二叉树的下一个节点

#### 面试题 09-I	用两个栈实现队列

##### 题目

>用两个栈实现一个队列。队列的声明如下，实现在尾部添加与在头部取元素的操作。





#####  思路

两个栈分别作为入栈和出栈。

入队操作由入栈进行。出队操作由出栈进行，第一次出队操作，可以将入栈中的元素倒进出栈中，这样出栈里的元素进行出栈操作等同于出队操作。当出栈空，又可以重复将入栈中的元素倒进出栈这一过程。



##### 代码

```cpp
class CQueue {
private:
    stack<int> s1;//入
    stack<int> s2;//出
public:
    CQueue() {

    }
    
    void appendTail(int value) {
        s1.push(value);
    }
    
    int deleteHead() {
        if(s2.size()==0){
            while(!s1.empty()){
                s2.push(s1.top());
                s1.pop();
            }
        }

       if(s2.size()==0){
           return -1;
       }else{
            int data = s2.top();
            s2.pop();
            return data;
       }
    }
};
```

#### 面试题 09-I	用两个队列实现栈

入栈就是入队列，出栈时，将有元素的队列全部放到另一个队列中，记录最后一个被拿出来的元素并弹出，这样原来有元素的队列就空了，下次入栈要入不空的队列，空队列要保持空一便另一个队列在出栈时找出队尾元素。

#### 面试题 10- I	斐波那契数列

##### 题目

>写一个函数，输入 n ，求斐波那契（Fibonacci）数列的第 n 项（即 F(N)）。斐波那契数列的定义如下：
>
>F(0) = 0,   F(1) = 1
>
>F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
>
>斐波那契数列由 0 和 1 开始，之后的斐波那契数就是由之前的两数相加而得出。
>
>答案需要取模 1e9+7（1000000007）

##### 思路1

迭代太慢，打表占空间，采用迭代法，只用两个变量就能完成计算。

时间复杂度`O(n)`

##### 代码1

```cpp
class Solution {
public:
    int fib(int n) {
        int a =0;
        int b=1;
        int sum=0;
        for(int i=0;i<n;++i){
            sum=(a+b)%1000000007;
            b=a;
            a=sum;
        }
        return a;
    }
};
```

 ##### 思路2

当然还有更快的，采用矩阵乘方计算，可以将n次数字加法替换为logn次矩阵乘法。



基于如下公式：
$$
\begin{bmatrix} f(n) & f(n-1) \\ f(n-1) & f(n-2) \end{bmatrix}
=
\begin{bmatrix} 1 & 1 \\ 1 & 0 \end{bmatrix}^{n-1}
$$
因此我们进行快速乘就好了。当然，虽然复杂度是`O(logn)`，但乘法计算速度很慢，所以综合速度并不快。





##### 代码2

```cpp
#define ll long long

const ll MOD = 1e9+7;

struct matrix
{
    ll m[2][2];
}ans, base;

matrix multi(matrix a, matrix b)
{
    matrix tmp;
    for(int i = 0; i < 2; ++i)
    {
        for(int j = 0; j < 2; ++j)
        {
            tmp.m[i][j] = 0;
            for(int k = 0; k < 2; ++k)
                tmp.m[i][j] = (tmp.m[i][j] + a.m[i][k] * b.m[k][j]) % MOD;
        }
    }
    return tmp;
}


class Solution {
public:
    int fib(int n) {
        base.m[0][0] = base.m[0][1] = base.m[1][0] = 1;
        base.m[1][1] = 0;
        ans.m[0][0] = ans.m[1][1] = 1;  // ans 初始化为单位矩阵 
        ans.m[0][1] = ans.m[1][0] = 0;
        while (n)
        {
            if (n & 1)  //实现 ans *= t; 其中要先把 ans赋值给 tmp，然后用 ans = tmp * t 
            {
                ans = multi(ans, base);
            }
            base = multi(base, base);
            n >>= 1;
        }
        return ans.m[0][1];
    }
};
```



#### 面试题 10- II	青蛙跳台阶问题

##### 题目

>一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。
>
>答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。
>
>```
>示例 1：
>
>输入：n = 2
>输出：2
>示例 2：
>
>输入：n = 7
>输出：21
>示例 3：
>
>输入：n = 0
>输出：1
>```

##### 思路

```
a[n]=a[n-1]+a[n-2]//跳上n层的方法有：先跳n-1层再跳1层或先跳n-2层再跳2层
a[1]=1
a[2]=2
```

##### 代码

```cpp
class Solution {
public:
    int numWays(int n) {
        int a=1;
        int b=2;
        for(int i=1;i<n;++i){
            int sum=(a+b)%1000000007;
            a=b;
            b=sum;
        }
        return a;
    }
};
```



#### 面试题 11	旋转数组的最小数字

##### 题目

>把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素。例如，数组 [3,4,5,1,2] 为 [1,2,3,4,5] 的一个旋转，该数组的最小值为1。
>

##### 思路

这道题有好多特殊情况，需要一一分析。

![Picture1.png](https://gitee.com/trialley/pics/raw/master/pics/20210225102233.png)

定义左数组为较大数组，右数组为较小数组，可能不存在左排序数组，但一定存在右排序数组

旋转点为右数组第一个元素，这也是最小元素。

排序数组的查找问题首先考虑使用 **二分法** 解决

##### 代码

```cpp
class Solution {
public:
    int minArray(vector<int>& numbers) {
        int l = 0;
        int r = numbers.size() - 1;
        while (l < r) {//当两者相等，则指向两数组错位点
            int mid = l + (r - l) / 2;//减法防止溢出，此时l<=m<r
            						//不用向上取整是因为当只有两个元素时，mid指向左侧元素，刚好可以与r对比
            						//而向上取整则是r跟r自己对比。

            if (numbers[mid] < numbers[r])  r = mid;
            //m指向右，r收缩安全；            						
            //至于为什么要用r而不是l作为对比元素，这是由旋转数组左右排序数组决定的。
            //l指向左数组第一个元素，但若只存在右排序数组，则l就指向右了，而r却恒指向右；
            //与l对比需要判断不存在左数组的特殊情况，而与右数组对比，可以天然避免判断左不存在的情况
            
            else if (numbers[mid] > numbers[r]) l = mid +1;
            //m指向左，l收缩也安全，充分性得证
            //那必然性呢？当l<=m<r，因此l必须加一以保证在l=m的情况下不陷入死循环。
            
            else r -= 1;
            //m<r，当nums[m]==nums[r]的时候，
            //若m指向左，则从r到l到m必然相等
            	//r若指向旋转点，则旋转点与l到m是相等的，因此不怕r越过旋转点。
            	//r若未指向旋转点，则左移一位恰好可以靠近旋转点
            //若m指向右，则m到r必然相等，且m<r，因此r左移也可以靠近旋转点
        }
        return numbers[l];
    }
};
```



几种特殊情况：

![1](https://gitee.com/trialley/pics/raw/master/pics/20210225105758.png)

![2](https://gitee.com/trialley/pics/raw/master/pics/20210225105801.png)

![3](https://gitee.com/trialley/pics/raw/master/pics/20210225105803.png)



#### 面试题 12	矩阵中的路径

##### 题目

>请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。路径可以从矩阵中的任意一格开始，每一步可以在矩阵中向左、右、上、下移动一格。如果一条路径经过了矩阵的某一格，那么该路径不能再次进入该格子。例如，在下面的3×4的矩阵中包含一条字符串“bfce”的路径（路径中的字母用加粗标出）。
>
>[
>
>["a",**"b"**,"c","e"],
>["s",**"f"**,**"c"**,"s"],
>["a","d",**"e"**,"e"]
>
>]
>
>但矩阵中不包含字符串“abfb”的路径，因为字符串的第一个字符b占据了矩阵中的第一行第二个格子之后，路径不能再次进入这个格子。

##### 思路

深度优先搜索DFS。另外在原数组修改即可实现visited功能。

##### 代码

```cpp
class Solution {
public:
    int m,n;
    bool dfs(vector<vector<char>>& board, string &word,int pos,int i,int j){
        if(pos == word.length())//字符串扫描完了，返回。
            return true;
        if(i < 0 || i >= m || j < 0 || j >= n) return false;
        if( || word[pos] != board[i][j]) return false;
        
        board[i][j] = NULL;
        bool ans = dfs(board,word,pos+1,i+1,j) 
            || dfs(board,word,pos+1,i-1,j) 
            || dfs(board,word,pos+1,i,j+1) 
            || dfs(board,word,pos+1,i,j-1);
        board[i][j] = word[pos];//其他路径还可能包含该元素，因此释放
        
        return ans;
    }
    bool exist(vector<vector<char>>& board, string word) {
        m = board.size(),n = board[0].size();
        for(int i = 0;i < m;i++)
            for(int j = 0;j < n;j++)
                if(dfs(board,word,0,i,j))
                    return true;
        return false;
    }
};
```



#### 面试题 13	机器人的运动范围



##### 思考

本题与 矩阵中的路径 类似，是典型的搜索 & 回溯问题。在介绍回溯算法算法前，为提升计算效率，首先讲述两项前置工作： 数位之和计算 、 可达解分析 。

数位之和计算：
设一数字 xx ，向下取整除法符号 //// ，求余符号 \odot⊙ ，则有：

x \odot 10x⊙10 ：得到 xx 的个位数字；
x // 10x//10 ： 令 xx 的十进制数向右移动一位，即删除个位数字。
因此，可通过循环求得数位和 ss ，数位和计算的封装函数如下所示：

PythonJavaC++

int sums(int x)
    int s = 0;
    while(x != 0) {
        s += x % 10;
        x = x / 10;
    }
    return s;
由于机器人每次只能移动一格（即只能从 xx 运动至 x \pm 1x±1），因此每次只需计算 xx 到 x \pm 1x±1 的数位和增量。本题说明 1 \leq n,m \leq 1001≤n,m≤100 ，以下公式仅在此范围适用。

![image-20210225140801571](https://gitee.com/trialley/pics/raw/master/pics/20210225140801.png)

```
(x + 1) % 10 != 0 ? s_x + 1 : s_x - 8;
```

可达解分析：
根据数位和增量公式得知，数位和每逢 进位 突变一次。根据此特点，矩阵中 满足数位和的解 构成的几何形状形如多个 等腰直角三角形 ，每个三角形的直角顶点位于 0, 10, 20, ...0,10,20,... 等数位和突变的矩阵索引处 。

三角形内的解虽然都满足数位和要求，但由于机器人每步只能走一个单元格，而三角形间不一定是连通的，因此机器人不一定能到达，称之为 不可达解 ；同理，可到达的解称为 可达解 （本题求此解） 。

图例展示了 n,m = 20n,m=20 ， k \in [6, 19]k∈[6,19] 的可达解、不可达解、非解，以及连通性的变化。

作者：jyd
链接：https://leetcode-cn.com/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof/solution/mian-shi-ti-13-ji-qi-ren-de-yun-dong-fan-wei-dfs-b/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

- 连通性，无需向左或向上走。
- 统计格数，因此visited无需改回去。
- vector嵌套初始化

```cpp
class Solution {
public:
    int movingCount(int m, int n, int k) {
        vector<vector<bool>> visited(m, vector<bool>(n, 0));
        return dfs(0, 0, 0, 0, visited, m, n, k);
    }
private:
    int dfs(int i, int j, int si, int sj, vector<vector<bool>> &visited, int m, int n, int k) {
        if(i >= m || j >= n //只向两个方向扩展，不会越0
            || k < si + sj //计算当前节点的位和是否过大
            || visited[i][j]) return 0;//已经访问返回
        visited[i][j] = true;//无需改回去，因为个数统计中，已经访问过得元素无需再访问
        
        //下面这行使用思路中提到的可达性和增量求数位和这两点
        return 1 + dfs(i + 1, j, (i + 1) % 10 != 0 ? si + 1 : si - 8, sj, visited, m, n, k) +
                   dfs(i, j + 1, si, (j + 1) % 10 != 0 ? sj + 1 : sj - 8, visited, m, n, k);
    }
};
```



#### 面试题 14- I	剪绳子最大乘积

##### 题目

>给你一根长度为 n 的绳子，请把绳子剪成整数长度的若干 段（n>1），每段绳子的长度记为 k[0],k[1]... 。请问 `k[0]*k[1]*...` 可能的最大乘积是多少？

这道题不限切分段数，但原来的描述很容易让人理解为n长的绳子必须切成m段，因此我在描述中把m去掉了。

另外，如果”切成一段“，也就是不切，则结果是`0*n`

这道题有三种办法来做，每种办法得到的最终结果都是一样的。

##### 思路1 动态规划

需要注意，动态规划需要手动多算几个数，因为前一个数的结果可能无法通过动态规划来获得，同时后面的数计算过程中使用的前几个数也可能不是前几个数的返回结果。这道题就是个很好的例子。

第一步：算几个数字出来

```
输入0，0*0，返回0
输入1，0*1，返回0
输入2，1*1，返回1
输入3，1*2，返回2
输入4，2*2，返回4
输入5，2*3，返回6
输入6，3*3，返回9
输入7，3*2*2或3*4，返回12
输入8，3*3*2，返回18
输入9，3*3*3，返回27
```

可以看到，3和2仿佛是两个基本单元，0123都需要提前手动计算，而往后就可以写代码计算了。



第二步：递推公式

```
设dp[n]为n长绳子的最优切割乘积，dp[n]=max(dp[j]*dp[n-j])  1<=j<=n/2
注意申请数组要申请dp[n+1]，长度-1为最大下标
```

第三步：确定初始状态

```
dp[0]=0 dp[1]=1 dp[2]=2 dp[3]=3
```



##### 代码

```cpp
class Solution {
public:
    int cuttingRope(int n) {
        if(n<2)return 0; 
        if(n==2)return 1;
        if(n==3)return 2;
        int dp[n+1];
        dp[0]=0;
        dp[1]=1;
        dp[2]=2;
        dp[3]=3;
        for(int i=4;i<=n;++i){//dp[i]=max(dp[j]*dp[i-j])  1<=j<=i/2
            int maxnum=0;
            for(int j=1;j<=i/2;++j){
                maxnum=max(maxnum,dp[j]*dp[i-j]);
            }
            dp[i]=maxnum;
        }
        return dp[n];
    }
};
```



##### 思路2 找规律

从前面手动计算得到的规律来看，似乎：

1. 只能切出3或2
2. 切出来的3越多越好

因此只有三种切法：

1. 3...322
2. 3...332
3. 3...333

因此可以这样：

```cpp
class Solution {
public:
    int cuttingRope(int n) {
        if(n<2)return 0; 
        if(n==2)return 1;
        if(n==3)return 2;
        int times=n/3;
        if(n%3==1){//3333322
            return pow(3,times-1)*4;
        }else if(n%3==2){//33333332
            return pow(3,times)*2;
        }else if(n%3==0){//33333333
            return pow(3,times);
        }
        return -1;
    }
};
```









##### 数学推导

https://leetcode-cn.com/problems/jian-sheng-zi-lcof/solution/mian-shi-ti-14-i-jian-sheng-zi-tan-xin-si-xiang-by/



#### 面试题 14- II	剪绳子 II

仅仅有大数，需要熟悉快速幂求余

https://www.jianshu.com/p/403105106802

此文介绍较为详细，但代码中int需要改为long，否则本题仍然溢出。

```cpp

class Solution {
public:
    long quickPow(int x, long n,int m) {
        long res = 1;
        long tt = x;
        while (n != 0) {
            if ((n & 1) == 1) {
                res *= tt;
                res %= m;
            }
            tt *= tt;
            tt %= m;
            n /= 2;
        }
        return res;
    }
    int cuttingRope(int n) {
        if(n<2)return 0; 
        if(n==2)return 1;
        if(n==3)return 2;
        int times=n/3;
        if(n%3==1){//3333322
            return quickPow(3,times-1,1000000007)*4% 1000000007;
        }else if(n%3==2){//33333332
            return quickPow(3,times,1000000007)*2% 1000000007;
        }else if(n%3==0){//33333333
            return quickPow(3,times,1000000007)% 1000000007;
        }
        return -1;
    }
};
```



#### 面试题 15	二进制中1的个数



>请实现一个函数，输入一个整数（以二进制串形式），输出该数二进制表示中 1 的个数。例如，把 9 表示成二进制是 1001，有 2 位是 1。因此，如果输入 9，则该函数输出 2。
>

##### 思路

最简单的位移然后跟1做与运算，这太简单了，肯定是让我们找更快的方法。

```
(二进制数-1)&二进制数=二进制数最右边的1变成0
如：
(00100-1)&00100=00000
(00101-1)&00101=00100
```

使用这个性质，数字中有多少1就只做多少次运算。

##### O(n)复杂度代码

```cpp
class Solution {
public:
    int hammingWeight(uint32_t n) {
        int count=0;
        while(n){
            if(n&1){
                count++;
            }
            n=n>>1;
        }
        return count;
    }
};
```

##### O(m)复杂度代码

```cpp
class Solution {
public:
    int hammingWeight(uint32_t n) {
        int count=0;
        while(n){
            count+=1;
            n=n&(n-1);
        }
        return count;
    }
};
```



## 第3章 高质量的代码 104



#### 面试题 16	数值的整数次方

>
>
>



#### 面试题 17	打印从1到最大的n位数







#### 面试题 18	删除链表的节点





#### 面试题 19	正则表达式匹配







#### 面试题 20	表示数值的字符串







#### 面试题 21	调整数组顺序使奇数位于偶数前面







#### 面试题 22	链表中倒数第k个节点







#### 面试题 24	反转链表







#### 面试题 25	合并两个排序的链表







#### 面试题 26	树的子结构





## 第4章 解决面试题的思路 153



#### 面试题 27	二叉树的镜像





#### 面试题 28	对称的二叉树





#### 面试题 29	顺时针打印矩阵







#### 面试题 30	包含min函数的栈





#### 面试题 31	栈的压入、弹出序列





#### 面试题 32 - I	从上到下打印二叉树





#### 面试题 32 - II	从上到下打印二叉树 II





#### 面试题 32 - III	从上到下打印二叉树 III





#### 面试题 33	二叉搜索树的后序遍历序列







#### 面试题 34	二叉树中和为某一值的路径





#### 面试题 35	复杂链表的复制





#### 面试题 36	二叉搜索树与双向链表







#### 面试题 37	序列化二叉树







#### 面试题 38	字符串的排列





## 第5章 优化时间和空间效率 201



#### 面试题 39	数组中出现次数超过一半的数字





#### 面试题 40	最小的k个数







#### 面试题 41	数据流中的中位数





#### 面试题 42	连续子数组的最大和





#### 面试题 43	1～n 整数中 1 出现的次数





#### 面试题 44	数字序列中某一位的数字





#### 面试题 45	把数组排成最小的数





#### 面试题 46	把数字翻译成字符串





#### 面试题 47	礼物的最大价值





#### 面试题 48	最长不含重复字符的子字符串





#### 面试题 49	丑数





#### 面试题 50	第一个只出现一次的字符



#### 面试题 51	数组中的逆序对





#### 面试题 52	两个链表的第一个公共节点





## 第6章 面试中的各项能力 256



#### 面试题 53 - I	在排序数组中查找数字 I







#### 面试题 53 - II	0～n-1中缺失的数字







#### 面试题 54	二叉搜索树的第k大节点





#### 面试题 55 - I	二叉树的深度





#### 面试题 55 - II	平衡二叉树







#### 面试题 56 - I	数组中数字出现的次数





#### 面试题 56 - II	数组中数字出现的次数 II



#### 面试题 57	和为s的两个数字



#### 面试题 57 - II	和为s的连续正数序列



#### 面试题 58 - I	翻转单词顺序



#### 面试题 58 - II	左旋转字符串



#### 面试题 59 - I	滑动窗口的最大值



#### 面试题 59 - II	队列的最大值  
#### 面试题 60	n个骰子的点数  
#### 面试题 61	扑克牌中的顺子  
#### 面试题 62	圆圈中最后剩下的数字  
#### 面试题 63	股票的最大利润  
#### 面试题 64	求1+2+…+n  
#### 面试题 65	不用加减乘除做加法  
#### 面试题 66	构建乘积数组  
#### 面试题 67	把字符串转换成整数



## 第7章 两个面试案例 315

#### 面试题 68 - I	二叉搜索树的最近公共祖先

#### 面试题 68 - II	二叉树的最近公共祖先  



## 面试题分类目录

### 数据结构类题目

#### LinkedList

面试题06-从尾到头打印链表

面试题22-链表中倒数第k个结点

面试题24-反转链表

面试题25-合并两个排序的链表

面试题35-复杂链表的复制

面试题52-两个链表的第一个公共节点

面试题18-删除链表的节点



#### Tree

面试题07-重建二叉树

面试题26-树的子结构

面试题27-二叉树的镜像

面试题32-1 -从上往下打印二叉树

面试题32-2 -从上往下打印二叉树 2

面试题32-3 -从上往下打印二叉树 3

面试题33-二叉搜索树的后序遍历序列

面试题34-二叉树中和为某一值的路径

面试题36-二叉搜索树与双向链表

面试题55-1-二叉树的深度

面试题55-2-平衡二叉树

面试题28-对称的二叉树

面试题37-序列化二叉树

面试题54-[二叉搜索树的第k大节点](https://link.zhihu.com/?target=https%3A//leetcode-cn.com/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof)



按算法分类

#### Stack & Queue

面试题09-用两个栈实现队列

面试题30-[包含min函数的栈](https://link.zhihu.com/?target=https%3A//leetcode-cn.com/problems/bao-han-minhan-shu-de-zhan-lcof)

面试题31-栈的压入、弹出序列

面试题58-1-翻转单词顺序

面试题59-1-滑动窗口的最大值



#### Heap

面试题40-最小的K个数



#### Hash Table

面试题50-第一个只出现一次的字符



#### 图

面试题12-矩阵中的路径(BFS)

面试题13-机器人的运动范围(DFS)

### 具体算法类题目

#### 斐波那契数列

面试题10-1-斐波拉契数列

面试题10-2-青蛙跳台阶问题



#### 搜索算法

面试题04-二维数组中的查找

面试题11-旋转数组的最小数字（二分查找）

面试题56-1-数组中数字出现的次数（二分查找）



#### 全排列

面试题38-字符串的排列



#### 动态规划

面试题42-连续子数组的最大和

面试题19-正则表达式匹配(我用的暴力)



#### 回溯

面试题12-矩阵中的路径(BFS)

面试题13-机器人的运动范围(DFS)



#### 排序

面试题51-数组中的逆序对(归并排序)

面试题40-最小的K个数(堆排序)



#### 位运算

面试题15-二进制中1的个数

面试题16-数值的整数次方



#### 其他算法

面试题05-替换空格

面试题21-调整数组顺序使奇数位于偶数前面

面试题39-数组中出现次数超过一半的数字

面试题43- 1～n整数中1出现的次数

面试题45-把数组排成最小的数

面试题49-丑数

面试题57-2-和为S的连续正数序列(滑动窗口思想)

面试题57-和为S的两个数字(双指针思想)

面试题58-2-左旋转字符串(矩阵翻转)

面试题62-圆圈中最后剩下的数(约瑟夫环)

面试题66-构建乘积数组
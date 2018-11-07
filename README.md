# 网站介绍
网站中主要包含平时学习前端过程中做的一些小案例或者小项目。网站搭建在centOS平台，网站的服务是基于nodejs的express框架来实现的，使用pm2命令行工具来守护进程。
## 客户端应用
指的只是通过服务器一次性发送HTML, CSS, JavaScript文件等页面需要的文件，页面中不涉及与服务器的交互。
### 1. 轮播图-原生js
- 页面功能：
	+ 打开页面后，会默认循环播放图片
	+ 当鼠标移动到图片上，会立刻切换到当前页面，并且停止循环播放，同时出现左右移动图片的焦点。
	+ 点击左右焦点时，图片会显示上一张或下一张
	+ 当鼠标移到右下角图片序号处，图片会切换到序号所对应的图片
	+ 鼠标离开页面，从当前位置开始恢复循环播放的效果
- 涉及到的前端知识
	+ 通过setInterval定时器封装动画的逻辑
	+ 通过DOM提供的API来操作来控制页面元素的布局与显示方式
	+ DOM API `onvisibilitychange` 和 `visibilityState` 的使用。
- 遇到的问题及原因与解决方法
	+ 在图片循环播放的动画过程中，无法准确移动到目标，导致在目标位置两边”抖动“。
		**原因：**封装动画函数的时候，由于步进的设置时一固定值，当当前位置与目标位置小于步进值得时候，就无法达到目标。
		**解决：**在出现这种得情况下，往往时目标位置与当前位置非常接近得时候，通过判断两个位置得差值，当小于步进时，直接将下一位置设置为目标位置即可。
	+ 在chrome浏览器中，切换到其他页面，再回到当前页面时，轮播图得功能就会发生错误。
		**原因：**chrome浏览器得休眠机制决定，当页面切换到后台，定时器会存入事件队列且不在执行，当再次切换回来时，多个定时器任务同时触发，导致页面出错。
		**解决：**通过DOM提供得`onvisibilitychange` 和 `visibilityState` 监测页面状态，当页面隐藏时，清除所有定时器；当页面切换回来时，自动恢复轮播效果得定时器。

### 2. 切割轮播图
- 页面功能：
	+ 打开页面后，会默认以切割图片得方式循环播放图片
	+ 当鼠标移动到图片上，会立刻切换到当前页面，并且停止循环播放，同时出现左右移动图片的焦点。
	+ 点击左右焦点时，图片会显示上一张或下一张
	+ 鼠标离开页面，从当前位置开始恢复循环播放的效果
- 涉及到的前端知识
	+ 使用JQuery操作dom元素，绑定事件`on`方法，设置行间样式`css`方法
	+ css3 `transform` 3D变换与 `transition` 过渡动画；
- 遇到的问题及原因与解决方法
	+ 在点击左右焦点时，短时间多次连续点击，导致图片前面部分一直处于切换状态。
		**原因：**一次点击之后，会记录到图片切换到下一张或上一张，多次点击会产生累加得效果，然而，一次完整得切换需要一定得时间间隔。从而导致切换过程不理想。
		**解决：**设置一个标记值`flag`，当前若正处于切换过程则`flag`设置为`false`,此阶段click事件不会执行图片的切换操作。

### 3. 弹性小球坠落
- 页面功能：
	+ 点击`drop`按钮，小球从左至右间隔1s坠落，触底之后反弹，触底会损失一部分动能。直至最后，动能为0，小球停止运动。
	+ 点击`reset`按钮，恢复初始状态。
- 涉及到的知识
	+ 重力加速度与速度的概念。
	+ 定时器的设置（小球坠落过程的动画逻辑）与清理。

### ...



## 服务器应用
页面中的交互涉及到与服务器的通信，涉及到客户端与服务端数据之间的交互与处理。
### 1. 留言板
- 页面功能：
	+ 进入留言板，显示当前留言板的状态。
	+ 点击`leave a message`按钮，进入到添加留言的界面，可以添加自己的留言
	+ 添加留言需要输留言人的姓名(2-20字符)和留言的内容（2-200字符）
	+ 留言界面点击提交，即可将留言提交到服务器，同时跳转到留言板首页。
- 涉及到的知识
	+ express框架处理客户端的请求
	+ express-art-template模板引擎的配置与使用
	+ node读写文件的操作
	+ node `url`模块对`get`请求表单的处理
	+ 以文件形式（非数据库）的数据持久化

### 2. 2048小游戏-原生js(移动端兼容)
- 页面功能
	+ 2048小游戏基本的游戏功能
	+ 游戏结束自动提交分数，并同步显示在历史记录列表栏中
	+ 能够查看历史游戏的用户ip，分数，以及游戏的时间
- 涉及到的知识
	+ 留言板案例中所涉及到的所有类容
	+ 移动端touch事件
	+ ajax异步请求（XMLHttpRequest实现）
	+ javascript异步操作中回掉函数的使用
- 遇到的问题及原因与解决方法
	+ 原生js实现游戏的动画效果的逻辑比较复杂。
	+ 移动端触屏默认事件与游戏的操作事件的冲突。
		**原因：**移动端上下滑动会触发浏览器的滚动事件，如果只是单纯的禁止默认事件，则页面将无法缩放和滑动。
		**解决：**定义一个游戏操作区域，将游戏操作的事件绑定在该区域，同时禁止该区域的滑动默认事件。
	+ 历史游戏记录中的时间与本地时间不符。
		**原因：**游戏记录中时间是由服务器端生成的，然而服务器的时间是美国西部时间，导致观察到的时间与本地时间不符。
		**解决：**服务器统一采用格林威治标准时间，在客户端使用Date对象方法对该事件进行处理，转化为客户端的本地时间。

### ...
// 模拟剩余代币和下次领取时间
let remainingTokens = 1000;
let nextClaimTime = "12:00";

// 获取页面元素
const walletAddressInput = document.getElementById("walletAddress");
const claimButton = document.getElementById("claimButton");
const message = document.getElementById("message");
const remainingTokensSpan = document.getElementById("remainingTokens");
const nextClaimTimeSpan = document.getElementById("nextClaimTime");

// 初始化页面数据
remainingTokensSpan.textContent = remainingTokens;
nextClaimTimeSpan.textContent = nextClaimTime;

// 领取按钮点击事件
claimButton.addEventListener("click", () => {
    const walletAddress = walletAddressInput.value.trim();

    if (!walletAddress) {
        message.textContent = "请输入有效的钱包地址！";
        return;
    }

    if (remainingTokens <= 0) {
        message.textContent = "代币已领完，请稍后再试！";
        return;
    }

    // 模拟领取成功
    remainingTokens -= 10;
    remainingTokensSpan.textContent = remainingTokens;
    message.textContent = `领取成功！10 代币已发送到 ${walletAddress}`;

    // 清空输入框
    walletAddressInput.value = "";
});
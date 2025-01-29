document.addEventListener('DOMContentLoaded', () => {
    const walletInput = document.getElementById('walletAddress');
    const claimButton = document.getElementById('claimButton');
    const messageElement = document.getElementById('message');
    const remainingTokens = document.getElementById('remainingTokens');
    const nextClaimTime = document.getElementById('nextClaimTime');

    // 模拟剩余代币数量
    let tokens = 1000;
    
    // 检查钱包地址格式是否正确
    function isValidWalletAddress(address) {
        return /^0x[a-fA-F0-9]{40}$/.test(address);
    }

    // 更新下次领取时间
    function updateNextClaimTime() {
        const now = new Date();
        now.setHours(now.getHours() + 24);
        nextClaimTime.textContent = now.toLocaleTimeString();
    }

    // 显示消息的函数
    function showMessage(text, isError = false) {
        messageElement.textContent = text;
        messageElement.className = isError ? 'error' : 'success';
        
        // 重置动画
        messageElement.style.animation = 'none';
        messageElement.offsetHeight; // 触发重排
        messageElement.style.animation = isError ? 'shake 0.5s' : 'pulse 1s';
    }

    // 添加输入动画效果
    walletInput.addEventListener('input', (e) => {
        if (e.target.value.length > 0) {
            e.target.style.boxShadow = '0 0 20px rgba(38, 208, 206, 0.3)';
        } else {
            e.target.style.boxShadow = 'none';
        }
    });

    claimButton.addEventListener('click', async () => {
        const address = walletInput.value.trim();
        
        if (!isValidWalletAddress(address)) {
            showMessage('请输入有效的以太坊钱包地址', true);
            return;
        }

        if (tokens <= 0) {
            showMessage('水龙头已经没有代币了', true);
            return;
        }

        // 添加加载动画
        claimButton.disabled = true;
        claimButton.textContent = '处理中...';
        
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 模拟发送代币
        tokens -= 10;
        remainingTokens.textContent = tokens;
        
        // 使用数字动画更新剩余代币
        const oldValue = tokens + 10;
        const duration = 1000;
        const start = performance.now();
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentValue = Math.round(oldValue - (progress * 10));
            remainingTokens.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        
        requestAnimationFrame(updateNumber);

        showMessage('成功发送10个代币到您的钱包！');
        updateNextClaimTime();

        // 重置按钮状态
        claimButton.disabled = false;
        claimButton.textContent = '领取';
        walletInput.value = '';
        walletInput.style.boxShadow = 'none';
    });

    // 初始化下次领取时间
    updateNextClaimTime();
}); 
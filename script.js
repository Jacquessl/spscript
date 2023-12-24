(async () => {
    while (true) {
      const offset = Math.random() + 1.2;
      await new Promise(r => setTimeout(r, 100));
      try {
        const itemContainers = document.querySelectorAll('div.CatalogPage-item--grid');
  
        for (const container of itemContainers) {
          const priceElement = container.querySelector('div.ItemPreview-priceValue');
          const discountElement = container.querySelector('div.GradientLabel.ItemPreview-discount');
  
          if (priceElement && discountElement) {
            const currentPrice = parseFloat(priceElement.textContent.replace("zł", "").replace(",", "."));
            const discountMatch = discountElement.textContent.match(/\d+/);
  
            if (discountMatch) {
              const discountValue = parseInt(discountMatch[0]);
  
              if (currentPrice > 10 && discountValue >= 30) {
                const addToCartButton = container.querySelector('button.ItemPreview-mainAction');
                if (addToCartButton) {
                  addToCartButton.click();
  
                  while (true) {
                    const offset = Math.random() + 1.2;
                    await new Promise(r => setTimeout(r, 100 * offset));
                    try {
                      const openCartButton = document.querySelector('div.HeaderContainer-cart button.CartButton-button');
                      if (openCartButton) {
                        openCartButton.click();
  
                        await new Promise(r => setTimeout(r, 500)); // Wait for the cart to open
  
                        const checkoutButton = document.querySelector('div.CartDropdown-btns button.CartDropdown-checkout');
                        if (checkoutButton) {
                          checkoutButton.click();
  
                          // Poczekaj na zmianę URL, oznaczającą przejście do kolejnej strony
                          await new Promise(resolve => {
                            const observer = new MutationObserver(() => {
                              if (window.location.href.includes('https://skinport.com/pl/cart')) {
  observer.disconnect();
                                resolve();
                              }
                            });
                            observer.observe(document.body, { childList: true, subtree: true });
                          });
  
                          // Po załadowaniu nowej strony dodaj kliknięcie w checkboxy
                          const checkboxToClick1 = document.querySelector('[id^="cb-tradelock-"]');
                          const checkboxToClick2 = document.querySelector('[id^="cb-cancellation-"]');
  
                          if(!checkboxToClick1){
          checkboxToClick2.click();
  }else{
                            checkboxToClick1.click();
                            checkboxToClick2.click();
  }
          const checkoutBtn = document.querySelector('button.SubmitButton.CartSummary-checkoutBtn');
                          if (checkoutBtn) {
                            checkoutBtn.click();
                 
                            
                            }                  
                            break;
                        }
                      }
                    } catch { null; }
                  }
                }
              }
            }
          }
        }
      } catch { null; }
    }
  })();

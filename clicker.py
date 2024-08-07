import pyautogui
import time

while True:
    try:
        pozycja = pyautogui.locateOnScreen('cvv.png', region=(900, 400, 120, 60))
        if pozycja is not None:
            pozycja = (950, 460)
            pyautogui.moveTo(pozycja)
            pyautogui.click()
            pyautogui.typewrite()
            pyautogui.moveTo(910, 560)
            pyautogui.click()
        else:
            time.sleep(0.05)
    except Exception as e:
        pass

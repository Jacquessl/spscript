import pyautogui
import time

while True:
    try:
        pozycja = pyautogui.locateOnScreen('cvv.png')
        if pozycja is not None:
            pyautogui.moveTo(pozycja)
            pyautogui.click()
            pyautogui.write()
            pyautogui.moveTo(1040, 453)
            pyautogui.click()
        else:
            time.sleep(0.05)
    except Exception as e:
        print(f"Wystąpił błąd: {e}")

import requests
import re
from bs4 import BeautifulSoup
import sys

etherscanUrl = "https://etherscan.io/"

def getAddressContent(address, type="token", nav=""):
    return requests.Session().get(
        etherscanUrl + type + "/" + address + nav,
        headers={"User-Agent": "Mozilla/5.0"},
    )


searchTokens = []
tokenAddress = False
print("Contract address: ")
for x in sys.stdin:
    if tokenAddress == False:
        tokenAddress = x.strip()
        print("Type done when you are finished.")
    elif x.strip() == "done":
        break
    else:
        searchTokens.append(x.strip())

print(searchTokens)

addressContent = getAddressContent(tokenAddress, "#balances").text
sid = re.findall("var sid = '(.+)';", addressContent)[0]

nextPage = True
i = 0
while nextPage == True:
    try:
        tokenHoldersUrl = (
            "generic-tokenholders2?m=normal&a="
            + tokenAddress
            + "&s=10000000000000000000&sid="
            + sid
            + "&p="
            + str(i + 1)
        )
        print("Page", i + 1)
        tokenHoldersContent = getAddressContent(tokenHoldersUrl).text
        soup = BeautifulSoup(tokenHoldersContent, "html.parser")
        tokenHoldersList = soup.find_all("a", target="_parent")

        for j in range(1, len(tokenHoldersList), 2):
            tempHolderUrl = re.findall(">(.+)</a>", str(tokenHoldersList[j]))[0]
            holderTokensList = getAddressContent(
                tempHolderUrl,
                "address",
            ).text
            holderSoup = BeautifulSoup(holderTokensList, "html.parser")
            holderTokenAddresses = re.findall("/token/0x(.+?)?a=0x", str(holderSoup))

            if len(holderTokenAddresses) < 1:
                continue

            holderTokenItems = re.findall(
                '<span class="list-amount link-hover__item hash-tag hash-tag--md text-truncate">(.+?)</span>',
                str(holderSoup),
            )
            holderTokens = {}
            newIndex = 0

            for index, x in enumerate(holderTokenItems):
                amount = x.split(" ")[0]
                try:
                    if type(float("".join(amount.split(",")))) == float:
                        holderTokens[" ".join(x.split(" ")[1:])] = (
                            "0x" + holderTokenAddresses[index - newIndex][0:-1]
                        )
                except:
                    holderTokenAddresses.remove(holderTokenAddresses[index - 1])
                    newIndex += 1

            if all(elem in [*holderTokens] for elem in searchTokens):
                print(True, "\n", tempHolderUrl)

        print("Next page...")
        i += 1
    except:
        print("No more pages")
        nextPage = False
        continue

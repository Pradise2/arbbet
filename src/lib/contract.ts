export const policastAbi =[
  {
    "abi": [
      {
        "type": "constructor",
        "inputs": [
          {
            "name": "_bettingToken",
            "type": "address",
            "internalType": "address"
          }
        ],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "AMM_FEE_RATE",
        "inputs": [],
        "outputs": [
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "DEFAULT_ADMIN_ROLE",
        "inputs": [],
        "outputs": [
          {
            "name": "",
            "type": "bytes32",
            "internalType": "bytes32"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "MARKET_VALIDATOR_ROLE",
        "inputs": [],
        "outputs": [
          {
            "name": "",
            "type": "bytes32",
            "internalType": "bytes32"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "MAX_MARKET_DURATION",
        "inputs": [],
        "outputs": [
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "MAX_OPTIONS",
        "inputs": [],
        "outputs": [
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "MIN_MARKET_DURATION",
        "inputs": [],
        "outputs": [
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "QUESTION_CREATOR_ROLE",
        "inputs": [],
        "outputs": [
          {
            "name": "",
            "type": "bytes32",
            "internalType": "bytes32"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "QUESTION_RESOLVE_ROLE",
        "inputs": [],
        "outputs": [
          {
            "name": "",
            "type": "bytes32",
            "internalType": "bytes32"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "addAMMLiquidity",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_amount",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "allParticipants",
        "inputs": [
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [
          {
            "name": "",
            "type": "address",
            "internalType": "address"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "ammSwap",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_optionIdIn",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_optionIdOut",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_amountIn",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_minAmountOut",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [
          {
            "name": "amountOut",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "bettingToken",
        "inputs": [],
        "outputs": [
          {
            "name": "",
            "type": "address",
            "internalType": "contract IERC20"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "buyShares",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_optionId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_quantity",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_maxPricePerShare",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "calculateAMMBuyCost",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_optionId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_quantity",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "calculateAMMSellRevenue",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_optionId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_quantity",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "calculateCurrentPrice",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_optionId",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "calculateNewPrice",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_optionId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_quantity",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_isBuy",
            "type": "bool",
            "internalType": "bool"
          }
        ],
        "outputs": [
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "calculateSellPrice",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_optionId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_quantity",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "categoryMarkets",
        "inputs": [
          {
            "name": "",
            "type": "uint8",
            "internalType": "enum PolicastMarketV3.MarketCategory"
          },
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "claimFreeTokens",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "claimLPRewards",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "claimWinnings",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "createFreeMarket",
        "inputs": [
          {
            "name": "_question",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "_description",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "_optionNames",
            "type": "string[]",
            "internalType": "string[]"
          },
          {
            "name": "_optionDescriptions",
            "type": "string[]",
            "internalType": "string[]"
          },
          {
            "name": "_duration",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_category",
            "type": "uint8",
            "internalType": "enum PolicastMarketV3.MarketCategory"
          },
          {
            "name": "_maxFreeParticipants",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_tokensPerParticipant",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_initialLiquidity",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_earlyResolutionAllowed",
            "type": "bool",
            "internalType": "bool"
          }
        ],
        "outputs": [
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "createMarket",
        "inputs": [
          {
            "name": "_question",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "_description",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "_optionNames",
            "type": "string[]",
            "internalType": "string[]"
          },
          {
            "name": "_optionDescriptions",
            "type": "string[]",
            "internalType": "string[]"
          },
          {
            "name": "_duration",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_category",
            "type": "uint8",
            "internalType": "enum PolicastMarketV3.MarketCategory"
          },
          {
            "name": "_marketType",
            "type": "uint8",
            "internalType": "enum PolicastMarketV3.MarketType"
          },
          {
            "name": "_initialLiquidity",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_earlyResolutionAllowed",
            "type": "bool",
            "internalType": "bool"
          }
        ],
        "outputs": [
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "disputeMarket",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_reason",
            "type": "string",
            "internalType": "string"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "feeCollector",
        "inputs": [],
        "outputs": [
          {
            "name": "",
            "type": "address",
            "internalType": "address"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "getBettingToken",
        "inputs": [],
        "outputs": [
          {
            "name": "",
            "type": "address",
            "internalType": "address"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "getEventBasedMarkets",
        "inputs": [],
        "outputs": [
          {
            "name": "",
            "type": "uint256[]",
            "internalType": "uint256[]"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "getFreeMarketInfo",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [
          {
            "name": "maxFreeParticipants",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "tokensPerParticipant",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "currentFreeParticipants",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "totalPrizePool",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "remainingPrizePool",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "isActive",
            "type": "bool",
            "internalType": "bool"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "getLPInfo",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_lp",
            "type": "address",
            "internalType": "address"
          }
        ],
        "outputs": [
          {
            "name": "contribution",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "rewardsClaimed",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "estimatedRewards",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "getMarketCount",
        "inputs": [],
        "outputs": [
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "getMarketFinancials",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [
          {
            "name": "adminInitialLiquidity",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "userLiquidity",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "platformFeesCollected",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "ammFeesCollected",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "adminLiquidityClaimed",
            "type": "bool",
            "internalType": "bool"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "getMarketInfo",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [
          {
            "name": "question",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "description",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "endTime",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "category",
            "type": "uint8",
            "internalType": "enum PolicastMarketV3.MarketCategory"
          },
          {
            "name": "optionCount",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "resolved",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "disputed",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "marketType",
            "type": "uint8",
            "internalType": "enum PolicastMarketV3.MarketType"
          },
          {
            "name": "invalidated",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "winningOptionId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "creator",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "earlyResolutionAllowed",
            "type": "bool",
            "internalType": "bool"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "getMarketOdds",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [
          {
            "name": "",
            "type": "uint256[]",
            "internalType": "uint256[]"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "getMarketOption",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_optionId",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [
          {
            "name": "name",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "description",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "totalShares",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "totalVolume",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "currentPrice",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "isActive",
            "type": "bool",
            "internalType": "bool"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "getMarketParticipants",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [
          {
            "name": "participants",
            "type": "address[]",
            "internalType": "address[]"
          },
          {
            "name": "participantCount",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "getMarketStatus",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [
          {
            "name": "isActive",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "isResolved",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "isExpired",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "canTrade",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "canResolve",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "timeRemaining",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "getMarketTiming",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [
          {
            "name": "createdAt",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "endTime",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "timeRemaining",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "isExpired",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "canResolveEarly",
            "type": "bool",
            "internalType": "bool"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "getMarketsByCategory",
        "inputs": [
          {
            "name": "_category",
            "type": "uint8",
            "internalType": "enum PolicastMarketV3.MarketCategory"
          },
          {
            "name": "_limit",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [
          {
            "name": "",
            "type": "uint256[]",
            "internalType": "uint256[]"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "getPlatformStats",
        "inputs": [],
        "outputs": [
          {
            "name": "totalFeesCollected",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "currentFeeCollector",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "totalMarkets",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "totalTrades",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "getPriceHistory",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_optionId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_limit",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [
          {
            "name": "",
            "type": "tuple[]",
            "internalType": "struct PolicastMarketV3.PricePoint[]",
            "components": [
              {
                "name": "price",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "timestamp",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "volume",
                "type": "uint256",
                "internalType": "uint256"
              }
            ]
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "getRoleAdmin",
        "inputs": [
          {
            "name": "role",
            "type": "bytes32",
            "internalType": "bytes32"
          }
        ],
        "outputs": [
          {
            "name": "",
            "type": "bytes32",
            "internalType": "bytes32"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "getUnresolvedMarkets",
        "inputs": [],
        "outputs": [
          {
            "name": "",
            "type": "uint256[]",
            "internalType": "uint256[]"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "getUserMarkets",
        "inputs": [
          {
            "name": "_user",
            "type": "address",
            "internalType": "address"
          }
        ],
        "outputs": [
          {
            "name": "",
            "type": "uint256[]",
            "internalType": "uint256[]"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "getUserPortfolio",
        "inputs": [
          {
            "name": "_user",
            "type": "address",
            "internalType": "address"
          }
        ],
        "outputs": [
          {
            "name": "",
            "type": "tuple",
            "internalType": "struct PolicastMarketV3.UserPortfolio",
            "components": [
              {
                "name": "totalInvested",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "totalWinnings",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "unrealizedPnL",
                "type": "int256",
                "internalType": "int256"
              },
              {
                "name": "realizedPnL",
                "type": "int256",
                "internalType": "int256"
              },
              {
                "name": "tradeCount",
                "type": "uint256",
                "internalType": "uint256"
              }
            ]
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "getUserShares",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_user",
            "type": "address",
            "internalType": "address"
          }
        ],
        "outputs": [
          {
            "name": "",
            "type": "uint256[]",
            "internalType": "uint256[]"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "getUserWinnings",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_user",
            "type": "address",
            "internalType": "address"
          }
        ],
        "outputs": [
          {
            "name": "hasWinnings",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "amount",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "grantMarketValidatorRole",
        "inputs": [
          {
            "name": "_account",
            "type": "address",
            "internalType": "address"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "grantQuestionCreatorRole",
        "inputs": [
          {
            "name": "_account",
            "type": "address",
            "internalType": "address"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "grantQuestionResolveRole",
        "inputs": [
          {
            "name": "_account",
            "type": "address",
            "internalType": "address"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "grantRole",
        "inputs": [
          {
            "name": "role",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "account",
            "type": "address",
            "internalType": "address"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "hasRole",
        "inputs": [
          {
            "name": "role",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "account",
            "type": "address",
            "internalType": "address"
          }
        ],
        "outputs": [
          {
            "name": "",
            "type": "bool",
            "internalType": "bool"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "hasUserClaimedFreeTokens",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_user",
            "type": "address",
            "internalType": "address"
          }
        ],
        "outputs": [
          {
            "name": "",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "hasUserClaimedWinnings",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_user",
            "type": "address",
            "internalType": "address"
          }
        ],
        "outputs": [
          {
            "name": "",
            "type": "bool",
            "internalType": "bool"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "invalidateMarket",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "isMarketTradable",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [
          {
            "name": "",
            "type": "bool",
            "internalType": "bool"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "lpRewardsEarned",
        "inputs": [
          {
            "name": "",
            "type": "address",
            "internalType": "address"
          }
        ],
        "outputs": [
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "marketCount",
        "inputs": [],
        "outputs": [
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "marketTrades",
        "inputs": [
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [
          {
            "name": "marketId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "optionId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "buyer",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "seller",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "price",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "quantity",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "timestamp",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "marketsByType",
        "inputs": [
          {
            "name": "",
            "type": "uint8",
            "internalType": "enum PolicastMarketV3.MarketType"
          },
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "owner",
        "inputs": [],
        "outputs": [
          {
            "name": "",
            "type": "address",
            "internalType": "address"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "pause",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "pauseMarket",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "paused",
        "inputs": [],
        "outputs": [
          {
            "name": "",
            "type": "bool",
            "internalType": "bool"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "platformFeeRate",
        "inputs": [],
        "outputs": [
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "previousBettingToken",
        "inputs": [],
        "outputs": [
          {
            "name": "",
            "type": "address",
            "internalType": "address"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "priceHistory",
        "inputs": [
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [
          {
            "name": "price",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "timestamp",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "volume",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "renounceOwnership",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "renounceRole",
        "inputs": [
          {
            "name": "role",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "callerConfirmation",
            "type": "address",
            "internalType": "address"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "resolveMarket",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_winningOptionId",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "revokeRole",
        "inputs": [
          {
            "name": "role",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "account",
            "type": "address",
            "internalType": "address"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "sellShares",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_optionId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_quantity",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_minPricePerShare",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "setFeeCollector",
        "inputs": [
          {
            "name": "_feeCollector",
            "type": "address",
            "internalType": "address"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "setPlatformFeeRate",
        "inputs": [
          {
            "name": "_feeRate",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "supportsInterface",
        "inputs": [
          {
            "name": "interfaceId",
            "type": "bytes4",
            "internalType": "bytes4"
          }
        ],
        "outputs": [
          {
            "name": "",
            "type": "bool",
            "internalType": "bool"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "tokenUpdatedAt",
        "inputs": [],
        "outputs": [
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "totalPlatformFeesCollected",
        "inputs": [],
        "outputs": [
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "totalWinnings",
        "inputs": [
          {
            "name": "",
            "type": "address",
            "internalType": "address"
          }
        ],
        "outputs": [
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "tradeCount",
        "inputs": [],
        "outputs": [
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "transferOwnership",
        "inputs": [
          {
            "name": "newOwner",
            "type": "address",
            "internalType": "address"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "unpause",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "updateBettingToken",
        "inputs": [
          {
            "name": "_newToken",
            "type": "address",
            "internalType": "address"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "updateBettingTokenAddress",
        "inputs": [
          {
            "name": "_newToken",
            "type": "address",
            "internalType": "address"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "userPortfolios",
        "inputs": [
          {
            "name": "",
            "type": "address",
            "internalType": "address"
          }
        ],
        "outputs": [
          {
            "name": "totalInvested",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "totalWinnings",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "unrealizedPnL",
            "type": "int256",
            "internalType": "int256"
          },
          {
            "name": "realizedPnL",
            "type": "int256",
            "internalType": "int256"
          },
          {
            "name": "tradeCount",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "userTradeHistory",
        "inputs": [
          {
            "name": "",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [
          {
            "name": "marketId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "optionId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "buyer",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "seller",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "price",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "quantity",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "timestamp",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "validateMarket",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "withdrawAdminLiquidity",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "withdrawPlatformFees",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "withdrawUnusedPrizePool",
        "inputs": [
          {
            "name": "_marketId",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "event",
        "name": "AMMSwap",
        "inputs": [
          {
            "name": "marketId",
            "type": "uint256",
            "indexed": true,
            "internalType": "uint256"
          },
          {
            "name": "optionIdIn",
            "type": "uint256",
            "indexed": false,
            "internalType": "uint256"
          },
          {
            "name": "optionIdOut",
            "type": "uint256",
            "indexed": false,
            "internalType": "uint256"
          },
          {
            "name": "amountIn",
            "type": "uint256",
            "indexed": false,
            "internalType": "uint256"
          },
          {
            "name": "amountOut",
            "type": "uint256",
            "indexed": false,
            "internalType": "uint256"
          },
          {
            "name": "trader",
            "type": "address",
            "indexed": false,
            "internalType": "address"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "AdminLiquidityWithdrawn",
        "inputs": [
          {
            "name": "marketId",
            "type": "uint256",
            "indexed": true,
            "internalType": "uint256"
          },
          {
            "name": "creator",
            "type": "address",
            "indexed": true,
            "internalType": "address"
          },
          {
            "name": "amount",
            "type": "uint256",
            "indexed": false,
            "internalType": "uint256"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "BatchWinningsDistributed",
        "inputs": [
          {
            "name": "marketId",
            "type": "uint256",
            "indexed": true,
            "internalType": "uint256"
          },
          {
            "name": "totalDistributed",
            "type": "uint256",
            "indexed": false,
            "internalType": "uint256"
          },
          {
            "name": "recipientCount",
            "type": "uint256",
            "indexed": false,
            "internalType": "uint256"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "BettingTokenUpdated",
        "inputs": [
          {
            "name": "oldToken",
            "type": "address",
            "indexed": true,
            "internalType": "address"
          },
          {
            "name": "newToken",
            "type": "address",
            "indexed": true,
            "internalType": "address"
          },
          {
            "name": "timestamp",
            "type": "uint256",
            "indexed": false,
            "internalType": "uint256"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "Claimed",
        "inputs": [
          {
            "name": "marketId",
            "type": "uint256",
            "indexed": true,
            "internalType": "uint256"
          },
          {
            "name": "user",
            "type": "address",
            "indexed": true,
            "internalType": "address"
          },
          {
            "name": "amount",
            "type": "uint256",
            "indexed": false,
            "internalType": "uint256"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "FeeCollected",
        "inputs": [
          {
            "name": "marketId",
            "type": "uint256",
            "indexed": true,
            "internalType": "uint256"
          },
          {
            "name": "amount",
            "type": "uint256",
            "indexed": false,
            "internalType": "uint256"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "FeeCollectorUpdated",
        "inputs": [
          {
            "name": "oldCollector",
            "type": "address",
            "indexed": true,
            "internalType": "address"
          },
          {
            "name": "newCollector",
            "type": "address",
            "indexed": true,
            "internalType": "address"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "FreeTokensClaimed",
        "inputs": [
          {
            "name": "marketId",
            "type": "uint256",
            "indexed": true,
            "internalType": "uint256"
          },
          {
            "name": "user",
            "type": "address",
            "indexed": true,
            "internalType": "address"
          },
          {
            "name": "tokens",
            "type": "uint256",
            "indexed": false,
            "internalType": "uint256"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "LPRewardsClaimed",
        "inputs": [
          {
            "name": "marketId",
            "type": "uint256",
            "indexed": true,
            "internalType": "uint256"
          },
          {
            "name": "provider",
            "type": "address",
            "indexed": true,
            "internalType": "address"
          },
          {
            "name": "amount",
            "type": "uint256",
            "indexed": false,
            "internalType": "uint256"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "LiquidityAdded",
        "inputs": [
          {
            "name": "marketId",
            "type": "uint256",
            "indexed": true,
            "internalType": "uint256"
          },
          {
            "name": "provider",
            "type": "address",
            "indexed": true,
            "internalType": "address"
          },
          {
            "name": "amount",
            "type": "uint256",
            "indexed": false,
            "internalType": "uint256"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "MarketCreated",
        "inputs": [
          {
            "name": "marketId",
            "type": "uint256",
            "indexed": true,
            "internalType": "uint256"
          },
          {
            "name": "question",
            "type": "string",
            "indexed": false,
            "internalType": "string"
          },
          {
            "name": "options",
            "type": "string[]",
            "indexed": false,
            "internalType": "string[]"
          },
          {
            "name": "endTime",
            "type": "uint256",
            "indexed": false,
            "internalType": "uint256"
          },
          {
            "name": "category",
            "type": "uint8",
            "indexed": false,
            "internalType": "enum PolicastMarketV3.MarketCategory"
          },
          {
            "name": "marketType",
            "type": "uint8",
            "indexed": false,
            "internalType": "enum PolicastMarketV3.MarketType"
          },
          {
            "name": "creator",
            "type": "address",
            "indexed": false,
            "internalType": "address"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "MarketDisputed",
        "inputs": [
          {
            "name": "marketId",
            "type": "uint256",
            "indexed": true,
            "internalType": "uint256"
          },
          {
            "name": "disputer",
            "type": "address",
            "indexed": false,
            "internalType": "address"
          },
          {
            "name": "reason",
            "type": "string",
            "indexed": false,
            "internalType": "string"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "MarketInvalidated",
        "inputs": [
          {
            "name": "marketId",
            "type": "uint256",
            "indexed": true,
            "internalType": "uint256"
          },
          {
            "name": "validator",
            "type": "address",
            "indexed": false,
            "internalType": "address"
          },
          {
            "name": "refundedAmount",
            "type": "uint256",
            "indexed": false,
            "internalType": "uint256"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "MarketPaused",
        "inputs": [
          {
            "name": "marketId",
            "type": "uint256",
            "indexed": true,
            "internalType": "uint256"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "MarketResolved",
        "inputs": [
          {
            "name": "marketId",
            "type": "uint256",
            "indexed": true,
            "internalType": "uint256"
          },
          {
            "name": "winningOptionId",
            "type": "uint256",
            "indexed": false,
            "internalType": "uint256"
          },
          {
            "name": "resolver",
            "type": "address",
            "indexed": false,
            "internalType": "address"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "MarketValidated",
        "inputs": [
          {
            "name": "marketId",
            "type": "uint256",
            "indexed": true,
            "internalType": "uint256"
          },
          {
            "name": "validator",
            "type": "address",
            "indexed": false,
            "internalType": "address"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "OwnershipTransferred",
        "inputs": [
          {
            "name": "previousOwner",
            "type": "address",
            "indexed": true,
            "internalType": "address"
          },
          {
            "name": "newOwner",
            "type": "address",
            "indexed": true,
            "internalType": "address"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "Paused",
        "inputs": [
          {
            "name": "account",
            "type": "address",
            "indexed": false,
            "internalType": "address"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "PlatformFeesWithdrawn",
        "inputs": [
          {
            "name": "collector",
            "type": "address",
            "indexed": true,
            "internalType": "address"
          },
          {
            "name": "amount",
            "type": "uint256",
            "indexed": false,
            "internalType": "uint256"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "RoleAdminChanged",
        "inputs": [
          {
            "name": "role",
            "type": "bytes32",
            "indexed": true,
            "internalType": "bytes32"
          },
          {
            "name": "previousAdminRole",
            "type": "bytes32",
            "indexed": true,
            "internalType": "bytes32"
          },
          {
            "name": "newAdminRole",
            "type": "bytes32",
            "indexed": true,
            "internalType": "bytes32"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "RoleGranted",
        "inputs": [
          {
            "name": "role",
            "type": "bytes32",
            "indexed": true,
            "internalType": "bytes32"
          },
          {
            "name": "account",
            "type": "address",
            "indexed": true,
            "internalType": "address"
          },
          {
            "name": "sender",
            "type": "address",
            "indexed": true,
            "internalType": "address"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "RoleRevoked",
        "inputs": [
          {
            "name": "role",
            "type": "bytes32",
            "indexed": true,
            "internalType": "bytes32"
          },
          {
            "name": "account",
            "type": "address",
            "indexed": true,
            "internalType": "address"
          },
          {
            "name": "sender",
            "type": "address",
            "indexed": true,
            "internalType": "address"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "SharesSold",
        "inputs": [
          {
            "name": "marketId",
            "type": "uint256",
            "indexed": true,
            "internalType": "uint256"
          },
          {
            "name": "optionId",
            "type": "uint256",
            "indexed": true,
            "internalType": "uint256"
          },
          {
            "name": "seller",
            "type": "address",
            "indexed": true,
            "internalType": "address"
          },
          {
            "name": "quantity",
            "type": "uint256",
            "indexed": false,
            "internalType": "uint256"
          },
          {
            "name": "price",
            "type": "uint256",
            "indexed": false,
            "internalType": "uint256"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "TradeExecuted",
        "inputs": [
          {
            "name": "marketId",
            "type": "uint256",
            "indexed": true,
            "internalType": "uint256"
          },
          {
            "name": "optionId",
            "type": "uint256",
            "indexed": true,
            "internalType": "uint256"
          },
          {
            "name": "buyer",
            "type": "address",
            "indexed": true,
            "internalType": "address"
          },
          {
            "name": "seller",
            "type": "address",
            "indexed": false,
            "internalType": "address"
          },
          {
            "name": "price",
            "type": "uint256",
            "indexed": false,
            "internalType": "uint256"
          },
          {
            "name": "quantity",
            "type": "uint256",
            "indexed": false,
            "internalType": "uint256"
          },
          {
            "name": "tradeId",
            "type": "uint256",
            "indexed": false,
            "internalType": "uint256"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "Unpaused",
        "inputs": [
          {
            "name": "account",
            "type": "address",
            "indexed": false,
            "internalType": "address"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "WinningsDistributedToUser",
        "inputs": [
          {
            "name": "marketId",
            "type": "uint256",
            "indexed": true,
            "internalType": "uint256"
          },
          {
            "name": "user",
            "type": "address",
            "indexed": true,
            "internalType": "address"
          },
          {
            "name": "amount",
            "type": "uint256",
            "indexed": false,
            "internalType": "uint256"
          }
        ],
        "anonymous": false
      },
      {
        "type": "error",
        "name": "AccessControlBadConfirmation",
        "inputs": []
      },
      {
        "type": "error",
        "name": "AccessControlUnauthorizedAccount",
        "inputs": [
          {
            "name": "account",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "neededRole",
            "type": "bytes32",
            "internalType": "bytes32"
          }
        ]
      },
      {
        "type": "error",
        "name": "AdminLiquidityAlreadyClaimed",
        "inputs": []
      },
      {
        "type": "error",
        "name": "AlreadyClaimed",
        "inputs": []
      },
      {
        "type": "error",
        "name": "AlreadyClaimedFree",
        "inputs": []
      },
      {
        "type": "error",
        "name": "AmountMustBePositive",
        "inputs": []
      },
      {
        "type": "error",
        "name": "BadDuration",
        "inputs": []
      },
      {
        "type": "error",
        "name": "BadOptionCount",
        "inputs": []
      },
      {
        "type": "error",
        "name": "BatchDistributionFailed",
        "inputs": []
      },
      {
        "type": "error",
        "name": "CannotDisputeIfWon",
        "inputs": []
      },
      {
        "type": "error",
        "name": "CannotSwapSameOption",
        "inputs": []
      },
      {
        "type": "error",
        "name": "EmptyBatchList",
        "inputs": []
      },
      {
        "type": "error",
        "name": "EmptyQuestion",
        "inputs": []
      },
      {
        "type": "error",
        "name": "EnforcedPause",
        "inputs": []
      },
      {
        "type": "error",
        "name": "ExceedsFreeAllowance",
        "inputs": []
      },
      {
        "type": "error",
        "name": "ExpectedPause",
        "inputs": []
      },
      {
        "type": "error",
        "name": "FeeTooHigh",
        "inputs": []
      },
      {
        "type": "error",
        "name": "FreeEntryInactive",
        "inputs": []
      },
      {
        "type": "error",
        "name": "FreeSlotseFull",
        "inputs": []
      },
      {
        "type": "error",
        "name": "InsufficientBalance",
        "inputs": []
      },
      {
        "type": "error",
        "name": "InsufficientLiquidity",
        "inputs": []
      },
      {
        "type": "error",
        "name": "InsufficientOutput",
        "inputs": []
      },
      {
        "type": "error",
        "name": "InsufficientParticipants",
        "inputs": []
      },
      {
        "type": "error",
        "name": "InsufficientPrizePool",
        "inputs": []
      },
      {
        "type": "error",
        "name": "InsufficientShares",
        "inputs": []
      },
      {
        "type": "error",
        "name": "InvalidInput",
        "inputs": []
      },
      {
        "type": "error",
        "name": "InvalidMarket",
        "inputs": []
      },
      {
        "type": "error",
        "name": "InvalidOption",
        "inputs": []
      },
      {
        "type": "error",
        "name": "InvalidToken",
        "inputs": []
      },
      {
        "type": "error",
        "name": "InvalidWinningOption",
        "inputs": []
      },
      {
        "type": "error",
        "name": "LengthMismatch",
        "inputs": []
      },
      {
        "type": "error",
        "name": "MarketAlreadyInvalidated",
        "inputs": []
      },
      {
        "type": "error",
        "name": "MarketAlreadyResolved",
        "inputs": []
      },
      {
        "type": "error",
        "name": "MarketEnded",
        "inputs": []
      },
      {
        "type": "error",
        "name": "MarketIsInvalidated",
        "inputs": []
      },
      {
        "type": "error",
        "name": "MarketNotActive",
        "inputs": []
      },
      {
        "type": "error",
        "name": "MarketNotEndedYet",
        "inputs": []
      },
      {
        "type": "error",
        "name": "MarketNotReady",
        "inputs": []
      },
      {
        "type": "error",
        "name": "MarketNotResolved",
        "inputs": []
      },
      {
        "type": "error",
        "name": "MarketNotValidated",
        "inputs": []
      },
      {
        "type": "error",
        "name": "MarketResolvedAlready",
        "inputs": []
      },
      {
        "type": "error",
        "name": "MarketTooNew",
        "inputs": []
      },
      {
        "type": "error",
        "name": "MinTokensRequired",
        "inputs": []
      },
      {
        "type": "error",
        "name": "NoFeesToWithdraw",
        "inputs": []
      },
      {
        "type": "error",
        "name": "NoLPRewards",
        "inputs": []
      },
      {
        "type": "error",
        "name": "NoWinningShares",
        "inputs": []
      },
      {
        "type": "error",
        "name": "NotAuthorized",
        "inputs": []
      },
      {
        "type": "error",
        "name": "NotFreeMarket",
        "inputs": []
      },
      {
        "type": "error",
        "name": "NotLiquidityProvider",
        "inputs": []
      },
      {
        "type": "error",
        "name": "OnlyAdminOrOwner",
        "inputs": []
      },
      {
        "type": "error",
        "name": "OptionInactive",
        "inputs": []
      },
      {
        "type": "error",
        "name": "OwnableInvalidOwner",
        "inputs": [
          {
            "name": "owner",
            "type": "address",
            "internalType": "address"
          }
        ]
      },
      {
        "type": "error",
        "name": "OwnableUnauthorizedAccount",
        "inputs": [
          {
            "name": "account",
            "type": "address",
            "internalType": "address"
          }
        ]
      },
      {
        "type": "error",
        "name": "PriceTooHigh",
        "inputs": []
      },
      {
        "type": "error",
        "name": "PriceTooLow",
        "inputs": []
      },
      {
        "type": "error",
        "name": "ReentrancyGuardReentrantCall",
        "inputs": []
      },
      {
        "type": "error",
        "name": "SamePrizeRequired",
        "inputs": []
      },
      {
        "type": "error",
        "name": "SameToken",
        "inputs": []
      },
      {
        "type": "error",
        "name": "TransferFailed",
        "inputs": []
      }
    ]
  }
] as const;

export const policastContract = {
  address: '0x8c7a476FFdB5818f241cCE82E6f2806a53F0cC32',
  abi: policastAbi,
} as const;

export const policastMarketV3Address = '0x8c7a476FFdB5818f241cCE82E6f2806a53F0cC32';
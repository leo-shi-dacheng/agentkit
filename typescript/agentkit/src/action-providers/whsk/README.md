# WHSK Action Provider

This directory contains the **WhskActionProvider** implementation, which provides actions to interact with **Wrapped Hsk (WHSK)** contracts on Base mainnet and Base sepolia.

## Directory Structure

```
whsk/
├── whskActionProvider.ts         # Main provider with WHSK functionality
├── whskActionProvider.test.ts    # Test file for WHSK provider
├── constants.ts                  # WHSK contract constants and ABI
├── schemas.ts                    # WHSK action schemas
├── index.ts                      # Main exports
└── README.md                     # This file
```

## Actions

- `wrap_hsk`: Convert ETH to WHSK

## Adding New Actions

To add new WHSK actions:

1. Define your action schema in `schemas.ts`
2. Implement the action in `whskActionProvider.ts`
3. Add tests in `whskActionProvider.test.ts`

## Network Support

The WHSK provider supports Hashkey mainnet and Hashkey testnet.

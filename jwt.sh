#!/bin/bash

# Check if argument is provided
if [ -z "$1" ]; then
  echo "Usage: $0 path/to/.env"
  exit 1
fi

ENV_FILE="$1"

# Generate private key and capture output
PRIVATE_KEY=$(openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048)

# Extract public key directly from private key
PUBLIC_KEY=$(echo "$PRIVATE_KEY" | openssl rsa -pubout 2>/dev/null)

# Write to .env file
{
  echo "JWT_PRIVATE_KEY=\"$PRIVATE_KEY\""
  echo "JWT_PUBLIC_KEY=\"$PUBLIC_KEY\""
} >> "$ENV_FILE"

echo "$ENV_FILE updated with generated JWT_PRIVATE_KEY and JWT_PUBLIC_KEY"

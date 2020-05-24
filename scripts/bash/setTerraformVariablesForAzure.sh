#!/bin/sh
echo "Setting environment variables for Terraform"
export ARM_SUBSCRIPTION_ID=67b5d3ac-d518-45dc-9ab6-abcad9751690
export ARM_CLIENT_ID=2270af1f-807c-43ef-9e15-c0981192cd7f
export ARM_CLIENT_SECRET=9d28221c-52cf-4595-8ea5-4c4f5a8341e9
export ARM_TENANT_ID=010dcf4a-8752-44de-952f-eb50b2f937ed

# Not needed for public, required for usgovernment, german, china
export ARM_ENVIRONMENT=public
#!/bin/bash

# Run frontend and backend concurrently
pnpx concurrently "cd ./frontend && pnpm run dev" "cd ./backend && pnpm run start:dev"

#!/bin/bash

# Run frontend and backend concurrently
concurrently "cd ./frontend && pnpm run dev" "cd ./backend && pnpm run start:dev"

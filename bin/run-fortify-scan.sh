#!/usr/bin/env bash

set -u -o pipefail

readonly max_attempts=4
attempt=1

while (( attempt <= max_attempts )); do
  echo "Resolving Fortify dependencies (attempt ${attempt}/${max_attempts})"

  if ./src/test/java/gradlew -p src/test/java resolveFortifyDependencies; then
    break
  fi

  if (( attempt == max_attempts )); then
    echo "Unable to resolve Fortify dependencies after ${max_attempts} attempts"
    exit 1
  fi

  delay=$((attempt * 15))
  echo "Fortify dependency resolution failed; retrying in ${delay} seconds"
  sleep "${delay}"
  ((attempt += 1))
done

exec ./src/test/java/gradlew -p src/test/java fortifyScan

import { Screen, Text, Button } from '@shared/components';
import type { ErrorFallbackProps } from '@shared/hoc';

// Shown while a screen is still loading.
export function RouteSkeleton() {
  return (
    <Screen>
      <Text variant="body-small-14" color="muted">
        Loading…
      </Text>
    </Screen>
  );
}

// Shown when a screen fails to load or crashes.
export function RouteError({ error, reset }: ErrorFallbackProps) {
  return (
    <Screen>
      <Text variant="heading-h2-20" as="h2">
        Something went wrong
      </Text>
      <Text variant="body-small-14" color="muted">
        {error.message}
      </Text>
      <Button variant="outline" onClick={reset}>
        Try again
      </Button>
    </Screen>
  );
}

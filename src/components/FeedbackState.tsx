import {ActivityIndicator, Pressable, StyleSheet, Text, View} from 'react-native';
import {t} from '../i18n';
import {colors, typography} from '../theme';

type FeedbackStateProps = {
  loading?: boolean;
  message?: string;
  onRetry?: () => void;
};

export function FeedbackState({loading, message, onRetry}: FeedbackStateProps) {
  return (
    <View style={styles.wrap}>
      {loading ? <ActivityIndicator color={colors.primary} size="large" /> : null}
      {message ? <Text style={styles.message}>{message}</Text> : null}
      {onRetry ? (
        <Pressable
          accessibilityRole="button"
          onPress={onRetry}
          style={styles.retry}>
          <Text style={styles.retryLabel}>{t.retry}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  message: {
    ...typography.body,
    color: colors.greyDark,
    textAlign: 'center',
  },
  retry: {
    backgroundColor: colors.primary,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  retryLabel: {
    ...typography.body,
    color: colors.white,
  },
});

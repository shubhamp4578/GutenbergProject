import {ActivityIndicator, Pressable, StyleSheet, Text, View} from 'react-native';
import {t} from '../i18n';
import {useTheme} from '../theme';

type FeedbackStateProps = {
  loading?: boolean;
  message?: string;
  onRetry?: () => void;
};

export function FeedbackState({loading, message, onRetry}: FeedbackStateProps) {
  const {colors, typography} = useTheme();

  return (
    <View style={styles.wrap}>
      {loading ? <ActivityIndicator color={colors.primary} size="large" /> : null}
      {message ? (
        <Text style={[typography.body, styles.message, {color: colors.textSecondary}]}>
          {message}
        </Text>
      ) : null}
      {onRetry ? (
        <Pressable
          accessibilityRole="button"
          onPress={onRetry}
          style={[styles.retry, {backgroundColor: colors.primary}]}>
          <Text style={[typography.body, styles.retryLabel, {color: colors.white}]}>
            {t.retry}
          </Text>
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
    textAlign: 'center',
  },
  retry: {
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  retryLabel: {
    fontFamily: 'Montserrat-SemiBold',
  },
});

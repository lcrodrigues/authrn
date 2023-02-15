import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useAuth} from '../contexts/auth';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Routes = () => {
  const {signed, loading} = useAuth();

  return (
    <>
      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator color="#999" />
        </View>
      ) : signed ? (
        <AppRoutes />
      ) : (
        <AuthRoutes />
      )}
    </>
  );
};

export default Routes;

import {View, StyleSheet, Button, Text} from 'react-native';
import React from 'react';
import {useAuth} from '../../contexts/auth';

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

const Dashboard = () => {
  const {user, signOut} = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <View style={styles.container}>
      <Text>Welcome, {user?.name}</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

export default Dashboard;

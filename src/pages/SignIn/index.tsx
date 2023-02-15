import {View, Button, StyleSheet} from 'react-native';
import React from 'react';
import {useAuth} from '../../contexts/auth';

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center'},
});

const SignIn = () => {
  const {signed, signIn, user} = useAuth();
  console.log(signed);
  console.log(user);

  const handleSignIn = async () => {
    signIn();
  };

  return (
    <View style={styles.container}>
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
};

export default SignIn;

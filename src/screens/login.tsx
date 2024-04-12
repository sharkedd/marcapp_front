import { Box } from 'native-base';
import { Input } from '@rneui/themed';

const Login = () => {
  return (
    <Box
      style={{
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        marginHorizontal: '7%',
        marginVertical: '10%',
      }}
    >
      <Input
        placeholder="INPUT WITH ERROR MESSAGE"
        errorStyle={{ color: 'red' }}
        errorMessage="ENTER A VALID ERROR HERE"
      />
    </Box>
  );
};

export default Login;

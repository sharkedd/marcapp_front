import { Box, Button, Center, Input, Text, VStack } from 'native-base';
import { useRef, useState } from 'react';
import registerService from '../services/register.service';
import { AlertDialog } from 'native-base';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Router';
import { Calendar } from 'react-native-calendars'


type FormDataT = {
  first_name: string;
  last_name: string;
  email: string;
  pass: string;
  birthday: string;
};

const InitData = {
  first_name: '',
  last_name: '',
  email: '',
  pass: '',
  birthday: '',
};

const Register = () => {
  const [data, setData] = useState<FormDataT>(InitData);
  const [alert, setAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const cancelRef = useRef(null);

  const setValue = (key: string, value: string) => {
    setData((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  const onClickButton = async () => {
    setLoading(true);
    const response = await registerService(data);
    setLoading(false);
  
    setMessage(response?.message || '');
    setAlert(true);
  
    if (response?.success) {
      setData(InitData);
      navigation.navigate('Home');
    }
  };

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
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={alert}
        onClose={() => setAlert(false)}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Body>{message}</AlertDialog.Body>
        </AlertDialog.Content>
      </AlertDialog>
      <VStack space={4} alignItems="center">
        <Center>
          <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            fontWeight: '700',
            marginVertical: '10%',
          }}
        >
          MarcApp
        </Text>
        </Center>
        <Center>
          <Input
            size="l"
            variant="outline"
            placeholder="First name"
            value={data?.first_name}
            onChange={(e) => setValue('first_name', e?.nativeEvent?.text as string)}
          />
        </Center>
        <Center>
          <Input
            size="l"
            variant="outline"
            placeholder="Last name"
            value={data?.last_name}
            onChange={(e) =>
              setValue('last_name', e?.nativeEvent?.text as string)
            }
          />
        </Center>
        <Center>
          <Input
            size="l"
            variant="outline"
            placeholder="Email"
            value={data?.email}
            onChange={(e) => setValue('email', e?.nativeEvent?.text as string)}
          />
        </Center>
        <Center>
          <Input
            size="l"
            type="password"
            variant="outline"
            placeholder="Password"
            value={data?.pass}
            onChange={(e) =>
              setValue('pass', e?.nativeEvent?.text as string)
            }
          />
        </Center>
        <Center>
          <Input
            size="l"
            variant="outline"
            placeholder="Birthday (YYYY-MM-DD)"
            value={data?.birthday}
            onChange={(e) =>
              setValue('birthday', e?.nativeEvent?.text as string)
            }
          />
        </Center>
        <Center>
          {/* FORMATO COMENTARIOS EN TSX
            */
          } 
          <Button isLoading={loading} onPress={onClickButton}>
            Create account
          </Button>
        </Center>
        <Center>
        <Calendar
            onDayPress={day => {
                console.log('selected day', day);
            }}
            />
          <Text
            style={{ marginTop: '5%' }}
            onPress={() => navigation.navigate('Login')}
          >
            I already have an account
          </Text>
        </Center>
      </VStack>
    </Box>
  );
};

export default Register;

import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Box } from 'native-base';
import { Button, Header, Text } from 'react-native-elements';
import 'text-encoding-polyfill';
import useUserStore from '../stores/useStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Router';
import timeRegistrationService from '../services/timeRegistration.service';
import getRegistrationStateService from '../services/getRegistrationStateService.service';

interface MarcajeDto {
  id: number,
  id_user: number,
  date: string,
  type: string,
}

const TimeRegistration = () => { 
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const userStore = useUserStore();
  const { email, firstName, id: userId } = userStore; // Asegúrate de tener el userId en el store
  const [timeRegistration, setTimeRegistration] = useState<MarcajeDto | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [registrationState, setRegistrationState] = useState<number>(0);

  // Function to fetch the current registration state
  const fetchRegistrationState = async () => {
    try {
      const response = await getRegistrationStateService(userId);
      if (response?.success) {
        console.log('Cantidad de registros:', response.data);
        setRegistrationState(response.data);
      } else {
        console.error('Failed to fetch registration state:', response?.message);
      }
    } catch (error) {
      console.log("An error occurred while fetching the registration state");
    }
  };

  useEffect(() => {
    // Fetch the initial registration state when the component mounts
    fetchRegistrationState();
  }, []);

  const handleRegistration = async () => {
    try {
      setLoading(true);
      const response = await timeRegistrationService();
      if (response?.success) {
        console.log('Successful response:', response.data);
        setTimeRegistration(response.data as MarcajeDto);
        setLoading(false);

        // Update the state based on the current registration state
        if (registrationState === 0) {
          setRegistrationState(1);
        } else if (registrationState === 1) {
          setRegistrationState(2);
        }
      } else {
        console.error('Failed response:', response?.message);
        setLoading(false);
      }
    } catch (error) {
      console.log("An error occurred");
      setLoading(false);
    }
  };

  const goSummary = () => {
    navigation.navigate("WeeklySummary");
  };

  const getButtonTitle = () => {
    if (registrationState === 0) {
      return 'Register Check-in time';
    } else if (registrationState === 1) {
      return 'Register Check-out time';
    } else {
      return 'Registration Completed';
    }
  };

  const getButtonStyle = () => {
    if (registrationState === 0) {
      return [styles.button, styles.checkInButton];
    } else if (registrationState === 1) {
      return [styles.button, styles.checkOutButton];
    } else {
      return styles.button;
    }
  };

  return (
    <Box style={styles.container}>
      <Header
        centerComponent={{
          text: 'Time Registration',
          style: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
        containerStyle={{
          backgroundColor: '#0AA5F2',
          justifyContent: 'space-around',
        }}
      />
      <Text
        style={{
          fontSize: 20,
          justifyContent: 'flex-start',
          fontWeight: '600',
          marginVertical: '10%',
          paddingHorizontal: '0%',
          color: 'gray',
        }}
      >
        Please select what would you like to do
      </Text>
      <View style={styles.buttonsContainer}>
        <Button
          title={getButtonTitle()}
          onPress={handleRegistration}
          loading={loading}
          buttonStyle={getButtonStyle()}
          containerStyle={[styles.buttonContainer, { top: 20, left: 20 }]}
          titleStyle={styles.buttonTitle}
          disabled={registrationState === 2}
        />
        <Button
          title='My Weekly Summary'
          onPress={goSummary}
          buttonStyle={styles.button}
          containerStyle={[styles.buttonContainer, { top: 170, left: 105 }]}
          titleStyle={styles.buttonTitle}
        />
      </View>

      {timeRegistration && (
        <View style={styles.registrationInfo}>
          <Text>{firstName}, your {timeRegistration.type} has been registered at {timeRegistration.date}</Text>
          <Text>Registration ID: {timeRegistration.id} </Text>
        </View>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingHorizontal: '0%',
    paddingVertical: '0%',
  },
  buttonsContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  button: {
    height: 120, // Ajusta la altura del botón aquí
    width: 150, // Ajusta el ancho del botón aquí
  },
  checkInButton: {
    backgroundColor: 'green', // Color del botón de Check-in
  },
  checkOutButton: {
    backgroundColor: 'red', // Color del botón de Check-out
  },
  buttonContainer: {
    position: 'absolute',
  },
  buttonTitle: {
    fontSize: 19, // Tamaño de la fuente del texto del botón
    fontWeight: 'bold', // Peso de la fuente del texto del botón
    color: 'white', // Color del texto del botón
  },
  registrationInfo: {
    marginTop: 50,
    alignItems: 'center',
  },
});

export default TimeRegistration;

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView } from 'react-native';

const ViewAppointmentsScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('https://doc-api-oixu.onrender.com/api/appointments/user/get', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }

      const data = await response.json();
      setAppointments(data.appointments);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
      <Text style={styles.label}>Appointment list</Text>
        {appointments?.map((appointment, index) => (
          <View key={index} style={styles.appointmentContainer}>
            <Text style={styles.label}>User:</Text>
            <Text style={styles.value}>{appointment.user.name}</Text>
            <Text style={styles.label}>Doctor:</Text>
            <Text style={styles.value}>{appointment.doctor.name}</Text>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{new Date(appointment.date).toDateString()}</Text>
            <Text style={styles.label}>Time:</Text>
            <Text style={styles.value}>{appointment.time}</Text>
            <Text style={styles.label}>Reason:</Text>
            <Text style={styles.value}>{appointment.reason}</Text>
            <Text style={styles.label}>Status:</Text>
            <Text style={styles.value}>{appointment.status}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appointmentContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    marginBottom: 10,
  },
});

export default ViewAppointmentsScreen;

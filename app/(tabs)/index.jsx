import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image, Platform } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.centerContainer}>
      <View style={styles.headerBackground} />
      <View style={styles.profileContainerWrapper}>
        <View style={styles.profileContainer}>
          <View style={styles.profilePictureWrapper}>
            <Image
              source={{ uri: 'https://via.placeholder.com/100?text=%3F' }}
              style={styles.profilePicture}
            />
          </View>
          <Text style={styles.nameText}>JOHN ANGELO PEREZ</Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Education</Text>
        <HoverableSchool schoolName="Santa Ana Center Elementary School" schoolLevel="Elementary" />
        <HoverableSchool schoolName="Sta. Ana National High School" schoolLevel="High School" />
        <HoverableSchool schoolName="Davao Wisdom Academy" schoolLevel="Senior High School" />
        <HoverableSchool schoolName="Holy Cross of Davao College" schoolLevel="Currently Enrolled" />
      </View>
    </ThemedView>
  );
}

function HoverableSchool({ schoolName, schoolLevel }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleMouseEnter = () => {
    Animated.spring(scaleAnim, {
      toValue: 1.1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const handleMouseLeave = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[styles.schoolItem, { transform: [{ scale: scaleAnim }] }]}
      onMouseEnter={Platform.OS === 'web' ? handleMouseEnter : undefined}
      onMouseLeave={Platform.OS === 'web' ? handleMouseLeave : undefined}
    >
      <Text style={styles.schoolName}>{schoolName}</Text>
      <Text style={styles.schoolLevel}>{schoolLevel}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: '#000000',
    flex: 1,
  },
  headerBackground: {
    width: '100%',
    backgroundColor: '#000000',
    height: 60,
  },
  profileContainerWrapper: {
    backgroundColor: '#000000',
    paddingVertical: 20,
    width: '100%',
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePictureWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ffffff',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profilePicture: {
    width: 100,
    height: 100,
  },
  nameText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  sectionContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#000000',
    borderRadius: 8,
    width: '90%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff',
  },
  schoolItem: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
  },
  schoolName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  schoolLevel: {
    fontSize: 14,
    color: '#ffffff',
  },
});

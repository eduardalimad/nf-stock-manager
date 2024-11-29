import React from 'react';
import { Modal, View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { ButtonApp } from './Button';
import { Input } from './InputDefault';

interface Props {
  visible: boolean;
  onClose: () => void;
}
const { width, height } = Dimensions.get('window');

const TransparentModalScreen = ({ visible, onClose }: Props) => {
  return (
    <View style={styles.container}>
      <Modal transparent={true} animationType="fade" visible={visible}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <Text style={styles.modalTitle}>FAR.LACTEA MARATA</Text>
              <TouchableOpacity onPress={onClose}>
                <Image source={require('../../assets/iconClose.png')} style={styles.iconClose} />
              </TouchableOpacity>
            </View>
            <View style={styles.body}>
              <View style={styles.row}>
                <Input title="Quantidade" condition="active" />
                <Input title="% de lucro" condition="active" />
              </View>
              <View style={styles.row}>
                <Input title="% de lucro" condition="disable" />
              </View>
              <ButtonApp title="Salvar" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: height * 0.1,
    alignItems: 'center'
  },
  modalContainer: {
    width: width * 0.9,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    elevation: 5,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  iconClose: {
    width: 18,
    height: 18,
  },
  body: {
    width: '100%',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
  },
});

export default TransparentModalScreen;

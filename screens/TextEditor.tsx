

import {
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  Image,
  Button,
  FlatList,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import { useThemeColors } from '../context/ThemeContext';
import ImagePicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';
import { useRef, useState, useEffect } from 'react';

const TextEditor = ({ route }: any) => {
  const { appBackground, textColor } = useThemeColors();
  const richText = useRef<RichEditor | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]); // State to store image data
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false); // State for keyboard visibility

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const customIconMap = {
    // Custom icons can be added here
  };

  const pickImage = () => {
    ImagePicker.openPicker({
      // width: 300,
      // height: 300,
      cropping: true,
    }).then(image => {
      convertBase64(image);
    });
  };

  const convertBase64 = async (image: any) => {
    if (image && image.path) {
      try {
        const base64String = await ImgToBase64.getBase64String(image.path);
        const str = `data:${image.mime};base64,${base64String}`;
        setImages(prevImages => [...prevImages, str]); // Add the image to the state
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('Image path is invalid');
    }
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: appBackground,
        height: '100%',
      }}
    >
      <ScrollView style={styles.editorContainer}>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor={'gray'}
          style={{ ...styles.textTitle, color: textColor }}
        />
        <RichEditor
          ref={richText}
          placeholder="Start typing here..."
          onChange={setContent}
          editorStyle={{ ...styles.editor, backgroundColor: appBackground }}
        />
      </ScrollView>

      {/* Horizontal slider for clickable images, hidden when the keyboard is visible */}
      {!isKeyboardVisible && (
        <FlatList
          data={images}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.imageSlider}
          renderItem={({ item }) => (
            <TouchableOpacity
              // activeOpacity={0.8}
              style={styles.imageWrapper}
            >
              <Image source={{ uri: item }} style={styles.image} />
            </TouchableOpacity>
          )}
        />
      )}

      {/* Rich Toolbar */}
      <RichToolbar
        editor={richText}
        selectedIconTint="#2095F2"
        iconTint="#000"
        iconMap={customIconMap}
        actions={[
          actions.keyboard,
          actions.setBold,
          actions.setItalic,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.insertLink,
          actions.setStrikethrough,
          actions.setUnderline,
          actions.removeFormat,
          actions.insertImage
        ]}
        onPressAddImage={pickImage}
        iconSize={20}
        style={{ ...styles.toolbar, backgroundColor: '#e6ebf0' }}
      />
      {/* <Button title="Add Image" onPress={pickImage} /> */}
    </View>
  );
};

export default TextEditor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textTitle: {
    fontSize: 21,
    marginHorizontal: 8,
  },
  editorContainer: {
    flex: 1,
    marginBottom: 10,
    
  },
  editor: {
    minHeight: 300,
    padding: 10,
  },
  imageSlider: {
    paddingHorizontal: 5,
    marginVertical: 5,
    position: 'absolute',
    bottom: 0,
    // left: 0,
    // right: 0,
    // backgroundColor: '#f7f9fc',
    paddingVertical: 10,
    // elevation: 5,
  },
  imageWrapper: {
    marginHorizontal: 5,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 10,
  },
  toolbar: {
    elevation: 4,
    shadowColor: '#000',
  },
});

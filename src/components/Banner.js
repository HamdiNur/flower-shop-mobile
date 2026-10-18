import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { colors } from '../utils/colors';

const slides = [
  {
    id: '1',
    tag: 'SPRING SALE',
    title: 'Get 20% off\nfresh bouquets',
    subtitle: 'Free delivery on orders over $50',
    background: colors.primary,
    titleColor: '#FFFFFF',
    textColor: colors.primarySoft,
  },
  {
    id: '2',
    tag: 'NEW ARRIVALS',
    title: 'Fresh tulips\nevery morning',
    subtitle: 'Hand-picked and delivered with love',
    background: colors.green,
    titleColor: '#FFFFFF',
    textColor: colors.greenSoft,
  },
  {
    id: '3',
    tag: 'GIFT IDEAS',
    title: 'Say it with\nflowers',
    subtitle: 'Birthdays, weddings, and thank-yous',
    background: colors.primarySoft,
    titleColor: colors.primary,
    textColor: colors.text,
  },
];

const AUTO_SCROLL_MS = 3500;

export default function Banner() {
  const { width } = useWindowDimensions();
  const slideWidth = width - 40; // the Home screen has 20 padding on each side

  const listRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);

  // Move to the next card every few seconds
  useEffect(() => {
    const timer = setInterval(() => {
      const next = (index + 1) % slides.length;
      listRef.current?.scrollToOffset({
        offset: next * slideWidth,
        animated: true,
      });
      setIndex(next);
    }, AUTO_SCROLL_MS);

    return () => clearInterval(timer);
  }, [index, slideWidth]);

  // Keep `index` correct when the user swipes by hand
  const handleScrollEnd = (event) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / slideWidth);
    setIndex(newIndex);
  };

  return (
    <View style={styles.wrapper}>
      <Animated.FlatList
        ref={listRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={handleScrollEnd}
        renderItem={({ item }) => (
          <View style={{ width: slideWidth, paddingHorizontal: 4 }}>
            <View style={[styles.card, { backgroundColor: item.background }]}>
              <Text style={[styles.tag, { color: item.textColor }]}>{item.tag}</Text>
              <Text style={[styles.title, { color: item.titleColor }]}>
                {item.title}
              </Text>
              <Text style={[styles.subtitle, { color: item.textColor }]}>
                {item.subtitle}
              </Text>
            </View>
          </View>
        )}
      />

      <View style={styles.dots}>
        {slides.map((slide, i) => {
          const inputRange = [(i - 1) * slideWidth, i * slideWidth, (i + 1) * slideWidth];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 22, 8],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.35, 1, 0.35],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={slide.id}
              style={[styles.dot, { width: dotWidth, opacity }]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 20 },
  card: {
    borderRadius: 20,
    padding: 20,
    height: 150,
    justifyContent: 'center',
  },
  tag: { fontSize: 12, fontWeight: 'bold', letterSpacing: 1 },
  title: { fontSize: 26, fontWeight: 'bold', marginTop: 6 },
  subtitle: { fontSize: 14, marginTop: 8 },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginHorizontal: 3,
  },
});
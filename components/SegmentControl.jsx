import { StyleSheet, Text, View } from 'react-native';

const SegmentControl = ({ segments, selectedSegment, onSegmentSelect, style }) => {
  return (
    <View style={[styles.container, style]}>
      {segments.map((segment, index) => (
        <Text
          key={index}
          style={[styles.segment, index === selectedSegment && styles.selectedSegment]}
          onPress={() => onSegmentSelect(index)}
        >
          {segment}
        </Text>
      ))}
    </View>
  );
};

export default SegmentControl;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  segment: {
    padding: 10,
    fontSize: 16,
  },
  selectedSegment: {
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#f4511e',
  },
});

// @flow

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import Icon from '~/components/common/Icon';
import appStyles from '~/styles';

const Wrapper = styled(TouchableOpacity)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('24%')}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
`;

const PodcastImage = styled(FastImage).attrs(({ uri }) => ({
  source: { uri },
}))`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('16%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('16%')}px;
  margin-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  border-radius: ${({ roundedImage, theme }) => (roundedImage ? theme.metrics.getWidthFromDP('8%') : 4)}px;
`;

const ContentContainer = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('57%')}px;
  justify-content: center;
`;

const PodcastTitle = styled(Text).attrs({
  numberOfLines: 2,
})`
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Bold;
  color: ${({ theme }) => theme.colors.white};
`;

const AuthorName = styled(Text).attrs({
  numberOfLines: 1,
})`
  margin-left: ${({ shouldShowDownloadStatus, theme }) => (shouldShowDownloadStatus ? theme.metrics.smallSize : 0)}px;
  font-size: ${({ theme }) => theme.metrics.mediumSize * 1.2}px;
  font-family: CircularStd-Medium;
  color: ${({ theme }) => theme.colors.subTextWhite};
`;

const BottomContent = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('50%')}px;
  margin-top: ${({ theme }) => theme.metrics.extraSmallSize}px;
  flex-direction: row;
  align-items: center;
`;

const PodcastDuration = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Medium;
  text-align: right;
  color: ${({ theme }) => theme.colors.subTextWhite};
`;

const Index = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  font-family: CircularStd-Bold;
  color: ${({ theme }) => theme.colors.white};
`;

const getDonwloadStatusIconConfig = (isDownloaded: boolean): Object => {
  const iconConfig = isDownloaded
    ? {
      name: 'cloud-check',
      color: appStyles.colors.primaryColor,
    }
    : {
      name: 'cloud-download-outline',
      color: appStyles.colors.white,
    };

  return {
    ...iconConfig,
    size: 20,
  };
};

type Props = {
  shouldShowDownloadStatus: boolean,
  onPressItem: Function,
  roundedImage: ?boolean,
  podcast: Object,
  index: number,
};

const RecentlyPlayedListItem = ({
  shouldShowDownloadStatus,
  roundedImage,
  onPressItem,
  podcast,
  index,
}: Props): Object => (
  <Wrapper
    onPress={() => onPressItem(podcast)}
  >
    <Index>{index}</Index>
    <PodcastImage
      uri={podcast.imageURL}
      roundedImage={roundedImage}
    />
    <ContentContainer>
      <PodcastTitle>{podcast.title}</PodcastTitle>
      <BottomContent>
        {shouldShowDownloadStatus && (
          <Icon
            {...getDonwloadStatusIconConfig(podcast.isDownloaded)}
          />
        )}
        <AuthorName
          shouldShowDownloadStatus={shouldShowDownloadStatus}
        >
          {podcast.author.name}
        </AuthorName>
      </BottomContent>
    </ContentContainer>
    <PodcastDuration>{podcast.duration}</PodcastDuration>
  </Wrapper>
);

export default RecentlyPlayedListItem;

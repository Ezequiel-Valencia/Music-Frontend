
// ErrorBoundary.tsx
import React from 'react';
import CuratorDescription from './CuratorDescription';
import { defaultSongs } from './MusicBody';
import MusicCarousel from './MusicCarousel';
import VoteSection from './VoteSection';

type Props = {
  children: React.ReactNode;
  setTodaysSelection: any
};

type State = {
  hasError: boolean;
  error: Error | null;
};

export class MusicErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
        this.props.setTodaysSelection(defaultSongs())
        return <>
          <CuratorDescription errorOcurred={true}></CuratorDescription>
          <MusicCarousel></MusicCarousel>
          <VoteSection></VoteSection>
        </>
    }

    return this.props.children;
  }
}






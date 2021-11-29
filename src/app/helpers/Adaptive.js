class Adaptive {
    isMobile = { maxWidth: 725 };

    isHorizontal = { maxHeight: 464 };

    isPortrait = { orientation: 'portrait' };

    isRetina = { minResolution: '2dppx' };

    isDesktop = { minWidth: 1225 };
}

export default new Adaptive();

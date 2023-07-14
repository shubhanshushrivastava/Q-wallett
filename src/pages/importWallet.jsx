
function importWalletFromSeedPhrase(seedPhrase) {
    // Validate seed phrase
    const isValid = ethers.utils.HDNode.isValidMnemonic(seedPhrase);
    if (!isValid) {
      console.error('Invalid seed phrase');
      return null;
    }
  
    try {
      const wallet = ethers.Wallet.fromMnemonic(seedPhrase);
  
      const address = wallet.address;
      const privateKey = wallet.privateKey;
      
      return {
        address,
        privateKey,
        seedPhrase,
      };
    } catch (error) {
      console.error('Error importing wallet:', error);
      return null;
    }
  }

const seedPhrase = 'sister,tribe,crumble,west,mixed,today,valid,raise,alcohol,palace,sport,series';
const importedWallet = importWalletFromSeedPhrase(seedPhrase);

if (importedWallet) {
    console.log('Imported Wallet Address:', importedWallet.address);
    console.log('Imported Wallet Private Key:', importedWallet.privateKey);
    console.log('Imported Seed Phrase:', importedWallet.seedPhrase);
  } else {
    console.log('Failed to import wallet.');
  }
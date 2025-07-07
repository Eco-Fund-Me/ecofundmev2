#!/usr/bin/env node

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

class KeyGenerator {
  static generateKey() {
    return crypto.randomBytes(32).toString('hex');
  }

  static generateMultipleKeys(count = 5) {
    const keys = [];
    for (let i = 0; i < count; i++) {
      keys.push(this.generateKey());
    }
    return keys;
  }

  static createEnvFile(keyName = 'ENCRYPTION_KEY') {
    const key = this.generateKey();
    const envContent = `${keyName}=${key}\n`;
    const envPath = path.join(process.cwd(), '.env.local');
    
    try {
      // Check if file exists and append, otherwise create
      if (fs.existsSync(envPath)) {
        const existingContent = fs.readFileSync(envPath, 'utf8');
        if (existingContent.includes(keyName)) {
          console.log(`⚠️  ${keyName} already exists in .env.local`);
          return key;
        }
        fs.appendFileSync(envPath, envContent);
        console.log(`✅ Added ${keyName} to existing .env.local`);
      } else {
        fs.writeFileSync(envPath, envContent);
        console.log(`✅ Created .env.local with ${keyName}`);
      }
      
      console.log(`🔑 Generated key: ${key}`);
      return key;
    } catch (error) {
      console.error('❌ Error writing to .env.local:', error.message);
      console.log(`🔑 Generated key: ${key}`);
      return key;
    }
  }

  static validateKey(key) {
    if (typeof key !== 'string') {
      return { valid: false, error: 'Key must be a string' };
    }
    
    if (key.length !== 64) {
      return { valid: false, error: `Key must be 64 characters long, got ${key.length}` };
    }
    
    if (!/^[0-9a-fA-F]+$/.test(key)) {
      return { valid: false, error: 'Key must contain only hexadecimal characters' };
    }
    
    return { valid: true };
  }
}

// CLI interface
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'generate':
  case 'gen':
    console.log('🔑 Generated AES-256 key:');
    console.log(KeyGenerator.generateKey());
    break;
    
  case 'multiple':
  case 'multi':
    const count = parseInt(args[1]) || 5;
    console.log(`🔑 Generated ${count} AES-256 keys:`);
    KeyGenerator.generateMultipleKeys(count).forEach((key, i) => {
      console.log(`${i + 1}: ${key}`);
    });
    break;
    
  case 'env':
    const keyName = args[1] || 'ENCRYPTION_KEY';
    KeyGenerator.createEnvFile(keyName);
    break;
    
  case 'validate':
    const keyToValidate = args[1];
    if (!keyToValidate) {
      console.log('❌ Please provide a key to validate');
      process.exit(1);
    }
    const result = KeyGenerator.validateKey(keyToValidate);
    if (result.valid) {
      console.log('✅ Key is valid!');
    } else {
      console.log(`❌ Invalid key: ${result.error}`);
    }
    break;
    
  default:
    console.log(`
🔐 Encryption Key Generator

Usage:
  node key-generator.js generate          # Generate a single key
  node key-generator.js multiple [count]  # Generate multiple keys
  node key-generator.js env [name]        # Create/update .env.local file
  node key-generator.js validate <key>    # Validate a key

Examples:
  node key-generator.js generate
  node key-generator.js multiple 3
  node key-generator.js env ENCRYPTION_KEY
  node key-generator.js validate a1b2c3d4...
`);
    break;
}

export default KeyGenerator;
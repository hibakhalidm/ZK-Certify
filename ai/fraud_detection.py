import tensorflow as tf
from tensorflow import keras
import numpy as np
from typing import Dict, List, Any

class CredentialFraudDetector:
    def __init__(self):
        self.model = self._build_model()
        
    def _build_model(self) -> keras.Model:
        model = keras.Sequential([
            keras.layers.Dense(64, activation='relu', input_shape=(10,)),
            keras.layers.Dropout(0.2),
            keras.layers.Dense(32, activation='relu'),
            keras.layers.Dropout(0.2),
            keras.layers.Dense(1, activation='sigmoid')
        ])
        
        model.compile(
            optimizer='adam',
            loss='binary_crossentropy',
            metrics=['accuracy']
        )
        
        return model
    
    def preprocess_credential(self, credential: Dict[str, Any]) -> np.ndarray:
        """Convert credential data into model input features"""
        features = [
            credential.get('issue_date', 0),
            credential.get('expiry_date', 0),
            len(credential.get('issuer_signature', '')),
            len(credential.get('holder_signature', '')),
            credential.get('credential_type', 0),
            credential.get('verification_count', 0),
            credential.get('revocation_status', 0),
            credential.get('issuer_trust_score', 0),
            credential.get('holder_trust_score', 0),
            credential.get('credential_age', 0)
        ]
        return np.array(features).reshape(1, -1)
    
    def detect_fraud(self, credential: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze credential for potential fraud"""
        features = self.preprocess_credential(credential)
        fraud_probability = self.model.predict(features)[0][0]
        
        # Generate risk factors
        risk_factors = self._analyze_risk_factors(credential)
        
        return {
            'fraud_probability': float(fraud_probability),
            'is_suspicious': fraud_probability > 0.7,
            'risk_factors': risk_factors
        }
    
    def _analyze_risk_factors(self, credential: Dict[str, Any]) -> List[str]:
        """Analyze specific risk factors in the credential"""
        risk_factors = []
        
        # Check for suspicious patterns
        if credential.get('verification_count', 0) > 100:
            risk_factors.append('Unusually high verification count')
            
        if credential.get('issuer_trust_score', 0) < 0.5:
            risk_factors.append('Low issuer trust score')
            
        if credential.get('holder_trust_score', 0) < 0.5:
            risk_factors.append('Low holder trust score')
            
        if credential.get('credential_age', 0) < 1:
            risk_factors.append('Very new credential')
            
        return risk_factors
    
    def train(self, training_data: List[Dict[str, Any]], labels: List[int]) -> None:
        """Train the model on labeled credential data"""
        X = np.array([self.preprocess_credential(cred)[0] for cred in training_data])
        y = np.array(labels)
        
        self.model.fit(
            X, y,
            epochs=10,
            batch_size=32,
            validation_split=0.2
        ) 
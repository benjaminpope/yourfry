import numpy as np 
import matplotlib.pyplot as plt 
import nltk 
import nltk.classify.util
from nltk.classify import NaiveBayesClassifier
from nltk.corpus import movie_reviews

'''-------------------------------------------------------
textmining.py

A script to do text mining of Stephen Fry's corpus in 
Python, for the Bodleian Libraries YourFry Hackathon.

inspired by

http://streamhacker.com/2010/05/10/ \
text-classification-sentiment-analysis-naive-bayes-classifier/
-------------------------------------------------------'''

def word_feats(words):
	'''Return a dict structure for bag-of-words feature modelling.'''
        return dict([(word, True) for word in words])

# corpus = np.loadtxt('../data/frytext.txt')
 
negids = movie_reviews.fileids('neg')
posids = movie_reviews.fileids('pos')
 
negfeats = [(word_feats(movie_reviews.words(fileids=[f])), 'neg') for f in negids]
posfeats = [(word_feats(movie_reviews.words(fileids=[f])), 'pos') for f in posids]
 
negcutoff = len(negfeats)*3/4
poscutoff = len(posfeats)*3/4
 
trainfeats = negfeats[:negcutoff] + posfeats[:poscutoff]
testfeats = negfeats[negcutoff:] + posfeats[poscutoff:]
print 'train on %d instances, test on %d instances' % (len(trainfeats), len(testfeats))
 
classifier = NaiveBayesClassifier.train(trainfeats)
print 'accuracy:', nltk.classify.util.accuracy(classifier, testfeats)
classifier.show_most_informative_features()
.PHONY: create added answered addAdminMembers addMembers

test: create added answered addAdminMembers addMembers
setup: addAdminMembers addMembers 
discussion: create added answered 

create:
	curl -i -H 'Content-Type: application/json' -d @initialData/created.json https://us-central1-github-discussions-notifier.cloudfunctions.net/discussion-created
added:
	curl -i http://localhost:5001/github-discussions-notifier/us-central1/onCommentAdded
answered:
	curl -i http://localhost:5001/github-discussions-notifier/us-central1/onDiscussionAnswered
addAdminMembers:
	curl -i -H "Content-Type: application/json" -d @initialData/admin.json http://localhost:5001/github-discussions-notifier/us-central1/addAdminMembers
addMembers:
	curl -i -H "Content-Type: application/json" -d @initialData/mentor.json http://localhost:5001/github-discussions-notifier/us-central1/member-add
